
import { useState, useEffect } from "react"
import Image from "next/image"
import { Copy, ExternalLink, ChevronRight, ChevronLeft, Filter, ChevronDown } from "lucide-react"
import { useWalletContext } from "~/context/WalletContext"

// Mock data for demonstration
const mockWalletData = {
  nfts: {
    weapons: [
      { id: 1, name: "Flaming Sword", rarity: "Epic", image: "/placeholder.svg?height=100&width=100" },
      { id: 2, name: "Ice Dagger", rarity: "Rare", image: "/placeholder.svg?height=100&width=100" },
      { id: 3, name: "Thunder Axe", rarity: "Legendary", image: "/placeholder.svg?height=100&width=100" },
      { id: 4, name: "Steel Hammer", rarity: "Common", image: "/placeholder.svg?height=100&width=100" },
      { id: 5, name: "Void Blade", rarity: "Legendary", image: "/placeholder.svg?height=100&width=100" },
      { id: 6, name: "Poison Dagger", rarity: "Rare", image: "/placeholder.svg?height=100&width=100" },
      { id: 7, name: "Battle Axe", rarity: "Common", image: "/placeholder.svg?height=100&width=100" },
      { id: 8, name: "Mystic Staff", rarity: "Epic", image: "/placeholder.svg?height=100&width=100" },
      { id: 9, name: "Ancient Bow", rarity: "Rare", image: "/placeholder.svg?height=100&width=100" },
      { id: 10, name: "Dragon Slayer", rarity: "Legendary", image: "/placeholder.svg?height=100&width=100" },
      { id: 11, name: "Crystal Wand", rarity: "Epic", image: "/placeholder.svg?height=100&width=100" },
      { id: 12, name: "Dark Scythe", rarity: "Rare", image: "/placeholder.svg?height=100&width=100" },
      { id: 13, name: "Golden Mace", rarity: "Common", image: "/placeholder.svg?height=100&width=100" },
      { id: 14, name: "Shadow Blade", rarity: "Legendary", image: "/placeholder.svg?height=100&width=100" },
      { id: 15, name: "Frost Bow", rarity: "Epic", image: "/placeholder.svg?height=100&width=100" },
      { id: 16, name: "Thunder Staff", rarity: "Rare", image: "/placeholder.svg?height=100&width=100" },
      { id: 17, name: "Fire Scythe", rarity: "Common", image: "/placeholder.svg?height=100&width=100" },
      ],
    pets: [
      { id: 1, name: "Shadow Dragon", rarity: "Legendary", image: "/placeholder.svg?height=100&width=100" },
      { id: 2, name: "Forest Wolf", rarity: "Epic", image: "/placeholder.svg?height=100&width=100" },
      { id: 3, name: "Fire Fox", rarity: "Rare", image: "/placeholder.svg?height=100&width=100" },
      { id: 4, name: "Stone Golem", rarity: "Common", image: "/placeholder.svg?height=100&width=100" },
      { id: 5, name: "Water Sprite", rarity: "Epic", image: "/placeholder.svg?height=100&width=100" },
      { id: 6, name: "Phoenix", rarity: "Legendary", image: "/placeholder.svg?height=100&width=100" },
    ],
  },
}

export function MyAccount() {
  const [activeTab, setActiveTab] = useState("weapons")
  const [copied, setCopied] = useState(false)
  const [filteredNfts, setFilteredNfts] = useState<any[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [rarityFilter, setRarityFilter] = useState("All")
  const [showRarityDropdown, setShowRarityDropdown] = useState(false)
  const itemsPerPage = 8

  const {connected, wallet } = useWalletContext();
  const [address, setAddress] = useState('Not connected');
  const [balance, setBalance] = useState("0");


  useEffect(() => {
    async function getData() {
      if (connected) {
        const addressData = await wallet.getChangeAddress();
        const balanceData = await wallet.getBalance();
        let adaBalance = "0";
        const lovelaceAsset = balanceData[0];
        const lovelace = parseInt(lovelaceAsset.quantity, 10);
        adaBalance = (lovelace / 1000000).toFixed(2);
        setAddress(addressData);
        setBalance(adaBalance);
      }
    };
    getData();

  }, [connected]);

  
  // Filter and paginate NFTs
  useEffect(() => {
    const currentNfts = mockWalletData.nfts[activeTab as keyof typeof mockWalletData.nfts]

    // Apply rarity filter
    const filtered = rarityFilter === "All" ? currentNfts : currentNfts.filter((nft) => nft.rarity === rarityFilter)

    setFilteredNfts(filtered)
    setCurrentPage(1) // Reset to first page when filter changes
  }, [activeTab, rarityFilter])

  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredNfts.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredNfts.length / itemsPerPage)

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }


  const shortenAddress = (address: string) => {
    if (address!== 'Not connected')
      return `${address.substring(0, 10)}...${address.substring(address.length - 13)}`
    else
      return address;
  }

  const getRarityCount = (rarity: string) => {
    const currentNfts = mockWalletData.nfts[activeTab as keyof typeof mockWalletData.nfts]
    if (rarity === "All") {
      return currentNfts.length
    }
    return currentNfts.filter((nft) => nft.rarity === rarity).length
  }

  const getFilteredTabCount = (tabName: string) => {
    const tabNfts = mockWalletData.nfts[tabName as keyof typeof mockWalletData.nfts]
    if (rarityFilter === "All") {
      return tabNfts.length
    }
    return tabNfts.filter((nft) => nft.rarity === rarityFilter).length
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        {/* Wallet Info Card */}
        <div className="bg-gray-900 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Wallet Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-400 mb-1">Wallet Address</p>
              <div className="flex items-center">
                <p className="font-mono text-sm mr-2">{shortenAddress(address)}</p>
                <button
                  onClick={() => copyToClipboard(address)}
                  className="text-purple-400 hover:text-purple-300"
                  aria-label="Copy wallet address"
                >
                  {copied ? "Copied!" : <Copy size={16} />}
                </button>
                <a
                  href={`https://preview.cardanoscan.io/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-purple-400 hover:text-purple-300"
                  aria-label="View on explorer"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <div>
              <p className="text-gray-400 mb-1">Balance</p>
              <p className="text-2xl font-bold text-purple-400">{balance}</p>
            </div>
          </div>
        </div>

        {/* NFT Collections */}
        <div className="bg-gray-900 rounded-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <h2 className="text-xl font-bold">My NFT Collections</h2>

            {/* Rarity Filter */}
            <div className="relative mt-2 md:mt-0">
              <button
                className="flex items-center space-x-1 bg-gray-800 px-3 py-2 rounded-md text-sm"
                onClick={() => setShowRarityDropdown(!showRarityDropdown)}
              >
                <Filter size={14} />
                <span>Rarity: {rarityFilter}</span>
                <ChevronDown size={14} />
              </button>

              {showRarityDropdown && (
                <div className="absolute right-0 mt-1 bg-gray-800 rounded-md shadow-lg z-10 w-40">
                  <ul>
                    {["All", "Legendary", "Epic", "Rare", "Common"].map((rarity) => (
                      <li key={rarity}>
                        <button
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 ${rarityFilter === rarity ? "text-purple-400" : ""}`}
                          onClick={() => {
                            setRarityFilter(rarity)
                            setShowRarityDropdown(false)
                          }}
                        >
                          {rarity} <span className="text-gray-500 ml-1">({getRarityCount(rarity)})</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-700 mb-6">
            <button
              className={`py-2 px-4 font-medium ${activeTab === "weapons" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400 hover:text-white"}`}
              onClick={() => setActiveTab("weapons")}
            >
              Weapons ({getFilteredTabCount("weapons")})
            </button>
            <button
              className={`py-2 px-4 font-medium ${activeTab === "pets" ? "text-purple-400 border-b-2 border-purple-400" : "text-gray-400 hover:text-white"}`}
              onClick={() => setActiveTab("pets")}
            >
              Pets ({getFilteredTabCount("pets")})
            </button>
          </div>

          {/* NFT Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentItems.map((nft) => (
              <div
                key={nft.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-purple-900/20 transition-all duration-300"
              >
                <div className="relative h-40 bg-gray-700">
                  <Image src={nft.image || "/placeholder.svg"} alt={nft.name} fill className="object-cover" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold">{nft.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <span
                      className={`text-sm ${
                        nft.rarity === "Legendary"
                          ? "text-yellow-400"
                          : nft.rarity === "Epic"
                            ? "text-purple-400"
                            : nft.rarity === "Rare"
                              ? "text-blue-400"
                              : "text-gray-400"
                      }`}
                    >
                      {nft.rarity}
                    </span>
                    <button className="text-gray-400 hover:text-white">
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredNfts.length === 0 && (
            <div className="text-center py-8 text-gray-400">No {activeTab} found matching your filters.</div>
          )}

          {/* Pagination */}
          {filteredNfts.length > 0 && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-gray-400">
                Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredNfts.length)} of {filteredNfts.length}{" "}
                items
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-md ${currentPage === 1 ? "text-gray-600 cursor-not-allowed" : "text-gray-400 hover:bg-gray-800"}`}
                  aria-label="Previous page"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-8 h-8 rounded-md ${
                      currentPage === number ? "bg-purple-600 text-white" : "text-gray-400 hover:bg-gray-800"
                    }`}
                  >
                    {number}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-md ${currentPage === totalPages ? "text-gray-600 cursor-not-allowed" : "text-gray-400 hover:bg-gray-800"}`}
                  aria-label="Next page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

