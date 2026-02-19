export default function AppLogo() {
    return (
        <>
            <div className="flex size-8 items-center justify-center">
                <img src="/logo.png" alt="Amias Technologies" className="size-8 object-contain" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-semibold">
                    Amias Technologies
                </span>
            </div>
        </>
    );
}
