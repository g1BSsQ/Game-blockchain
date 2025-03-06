import { useUnityContext, Unity } from 'react-unity-webgl';
import { useEffect, useRef } from 'react';

const GameStart = () => {
    const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
        loaderUrl: '/Build/itchProject.loader.js',
        dataUrl: '/Build/itchProject.data',
        frameworkUrl: '/Build/itchProject.framework.js',
        codeUrl: '/Build/itchProject.wasm',
    });

    const containerRef = useRef(null);

    // Tự động bật fullscreen khi trò chơi đã tải xong
    useEffect(() => {
        if (isLoaded && containerRef.current) {
            containerRef.current.requestFullscreen().catch((err) => {
                console.error('Không thể vào fullscreen:', err);
            });
        }
    }, [isLoaded]); // Chạy khi isLoaded thay đổi

    return (
        <div
            ref={containerRef}
            style={{
                width: '100vw',
                height: '100vh',
                margin: 0,
                padding: 0,
                overflow: 'hidden',
                position: 'fixed',
                top: 0,
                left: 0,
            }}
        >
            {!isLoaded && (
                <p
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        color: 'white',
                        fontSize: '24px',
                    }}
                >
                    Loading... {Math.round(loadingProgression * 100)}%
                </p>
            )}
            <Unity
                unityProvider={unityProvider}
                style={{ width: '100%', height: '100%', border: 'none' }}
            />
        </div>
    );
};

export default GameStart;