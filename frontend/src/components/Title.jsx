

const Title = ({
    spaceY = "py-20",
    title,
    desc,
    align = "text-left",
    }) => {
        return (
            <section>
                <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${spaceY}`}>
                    {/* Header */}
                    <div className={`${align} mb-12`}>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            {title}
                        </h2>
                        <h4 className="text-lg max-w-2xl md:max-w-none whitespace-normal md:whitespace-nowrap">
                            {desc}
                        </h4>
                    </div>
                </div>
            </section>
        )
    }

export default Title;