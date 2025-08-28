import { FC } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Locale } from "@/components/Locale/Locale";
import locales from "@localization/testimonial_page.json";
import { Separator } from "@/components/Separator/Separator";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { Button } from "@/components/Button/Button";
import { Image } from "@/components/Image/Image";

export const TestimonialPage: FC = () => {
    return (
        <Flexbox
            variant="main"
            direction="column"
            gap={20}
            className="max-w-8xl mx-auto px-4 py-10 md:px-6"
        >
            <Locale
                variant="h1"
                className="text-center text-2xl font-bold md:text-3xl"
            >
                {locales.introParagraph}
            </Locale>

            <Flexbox
                direction="row"
                wrap="wrap"
                justifyContent="center"
                gap="6"
                className="mt-6 gap-y-8"
            >
                {locales.featured.map((testimonial) => (
                    <Flexbox
                        direction="column"
                        className="max-w-140 bg-background-normal w-full overflow-hidden rounded-xl p-5 shadow-lg transition-all duration-300 hover:shadow-xl sm:p-6"
                    >
                        <Flexbox
                            direction="row"
                            gap="4"
                            alignItems="center"
                            className="mb-4"
                        >
                            <Image
                                source={testimonial.image}
                                alternative={testimonial.name.en}
                                className="border-primary-light dark:border-primary-dark h-50 w-50 rounded-full border-2 object-cover"
                            />
                            <div>
                                <Locale
                                    variant="h3"
                                    className="text-primary-dark text-xl font-bold"
                                >
                                    {testimonial.name}
                                </Locale>
                                <Locale
                                    variant="p"
                                    className="text-secondary-normal"
                                >
                                    {testimonial.title}
                                </Locale>
                            </div>
                        </Flexbox>

                        <Locale
                            variant="p"
                            className="text-foreground-dark mb-4 italic leading-relaxed"
                        >
                            {testimonial.quote}
                        </Locale>

                        <Image
                            source={locales.linkedinImage.source}
                            alternative={locales.linkedinImage.alternative}
                        />
                    </Flexbox>
                ))}
            </Flexbox>

            <Flexbox direction="column" gap={15} className="mt-12">
                <Locale
                    variant="h2"
                    className="text-center text-2xl font-bold md:text-3xl"
                >
                    {locales.caseStudies.title}
                </Locale>

                <Flexbox
                    direction="row"
                    wrap="wrap"
                    justifyContent="center"
                    gap="6"
                    className="gap-y-8"
                >
                    {locales.caseStudies.stories.map((story) => (
                        <Flexbox
                            key={story.id}
                            direction="column"
                            className="max-w-140 bg-background-normal w-full overflow-hidden rounded-xl p-5 shadow-lg transition-all duration-300 hover:shadow-xl sm:p-6"
                        >
                            <Image
                                source={story.image}
                                alternative={story.name.en}
                                className="w-full rounded-lg object-cover"
                            />
                            <Locale
                                variant="h3"
                                className="text-foreground-dark mt-4 text-2xl font-bold"
                            >
                                {story.name}
                            </Locale>
                            <Locale
                                variant="p"
                                className="text-primary-normal text-xl"
                            >
                                {story.title}
                            </Locale>
                            <Locale
                                variant="p"
                                className="text-foreground-dark mt-3 leading-relaxed"
                            >
                                {story.summary}
                            </Locale>
                        </Flexbox>
                    ))}
                </Flexbox>
            </Flexbox>

            <Flexbox direction="column" gap="8" className="mt-12 px-4 md:px-0">
                {/* <Flexbox direction="column" gap="4" className="items-center">
                    <Locale
                        variant="h2"
                        className="text-center text-xl font-bold md:text-2xl"
                    >
                        {locales.trust.title}
                    </Locale>
                    <p className="text-center text-sm text-gray-600 dark:text-gray-300">
                        <Locale>{locales.trust.stat}</Locale>
                    </p>

                    <Flexbox
                        direction="row"
                        wrap="wrap"
                        justifyContent="center"
                        gap="8"
                        className="mt-6 gap-y-6 opacity-80 grayscale hover:grayscale-0"
                    >
                        {locales.trust.logos.map((logo, index) => (
                            <img
                                key={index}
                                src={logo}
                                alt="Partner Logo"
                                className="h-8 w-auto object-contain sm:h-10"
                            />
                        ))}
                    </Flexbox>
                </Flexbox> */}

                <Flexbox
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={5}
                    className="text-foreground-light bg-background-dark rounded-2xl p-8 text-center shadow-xl"
                >
                    <Locale
                        variant="h2"
                        className="text-foreground-dark text-2xl font-bold md:text-3xl"
                    >
                        {locales.cta.title}
                    </Locale>

                    <Button
                        className="h-20 w-1/2 text-2xl"
                        link={DISCOVER_ROUTES.base.routes.courses}
                        variant="primary"
                    >
                        <Locale>{locales.cta.button}</Locale>
                    </Button>
                </Flexbox>
            </Flexbox>
        </Flexbox>
    );
};
