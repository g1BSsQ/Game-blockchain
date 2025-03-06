import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import ConnectionHandler from "./ConnectionHandler";
export default function Header() {
  return (
    <>
      <Head>
        <title>Bruhtato Games - Gaming on the Cardano Blockchain</title>
        <meta name="description" content="Experience the future of gaming on the Cardano blockchain" />
      </Head>

      <header className="px-4 py-4 bg-gray-900 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-2">
          <Image
            src="/img/Bruhtato.jpg"
            alt="Bruhtato Logo"
            width={48}
            height={48}
            className="rounded-full bg-green-500"
          />
          <span className="text-xl font-bold">Bruhtato</span>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
          <Link href="/" className="text-white hover:text-gray-300">
            HOME
          </Link>
          <Link href="/MyAccount" className="text-white hover:text-gray-300">
            MY ACCOUNT
          </Link>
          <Link href="#" className="text-white hover:text-gray-300">
            MARKETPLACE
          </Link>
        </nav>

        {/* Connect Wallet Button */}
        <div className="flex items-center">
          <div className="w-47 flex-shrink-0 flex justify-end">
            <ConnectionHandler isDisabled={false} />
          </div>
        </div>
      </header>
    </>
  );
}