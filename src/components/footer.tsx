function Footer() {
    return (
        <footer className="bg-footer-background text-footer-foreground bottom-0 flex items-center justify-center w-full pt-5 pb-12 border-t">
            <div className="flex lg:w-[50rem] md:w-[43rem] w-[35rem] items-start justify-between min-h-[20rem]">
                <div className="text-center">
                    <div className="flex flex-col items-start gap-2">
                        <img src="/AFbigHeader.png" alt="logo" className="w-[10rem] rounded-md" />
                        <span className="font-semibold">ArtFocused</span>
                    </div>
                    Footer
                </div>
                <div className="">
                    Footer RIGHT
                </div>
            </div>
        </footer>
    )
}

export default Footer