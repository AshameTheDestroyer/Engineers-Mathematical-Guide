import { FC } from "react";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Locale } from "@/components/Locale/Locale";
import locales from "@localization/testimonial_page.json";
import { Separator } from "@/components/Separator/Separator";
import { DISCOVER_ROUTES } from "@/routes/discover.routes";
import { Button } from "@/components/Button/Button";

export const TestimonialPage: FC = () => {
    return (
        <Flexbox
            variant="main"
            direction="column"
            gap="8"
            className="mx-auto max-w-6xl px-4 py-10 md:px-6"
        >
            <Locale
                variant="h1"
                className="text-center text-xl font-bold md:text-2xl"
            >
                {locales.introParagraph}
            </Locale>

            <Separator orientation="horizontal" />

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
                        className="w-full max-w-sm overflow-hidden rounded-xl bg-white p-5 shadow-lg transition-all duration-300 hover:shadow-xl sm:p-6 dark:bg-gray-800"
                    >
                        <Flexbox
                            direction="row"
                            gap="4"
                            alignItems="center"
                            className="mb-4"
                        >
                            <img
                                src={testimonial.image}
                                alt={testimonial.name.en}
                                className="border-primary-light dark:border-primary-dark h-14 w-14 rounded-full border-2 object-cover"
                            />
                            <div>
                                <Locale
                                    variant="h3"
                                    className="text-sm font-bold text-gray-900 sm:text-base dark:text-white"
                                >
                                    {testimonial.name}
                                </Locale>
                                <Locale
                                    variant="p"
                                    className="text-xs text-gray-600 dark:text-gray-300"
                                >
                                    {testimonial.title}
                                </Locale>
                            </div>
                        </Flexbox>

                        <Locale
                            variant="p"
                            className="mb-4 italic leading-relaxed text-gray-800 dark:text-gray-200"
                        >
                            {testimonial.quote}
                        </Locale>

                        <Flexbox direction="row" gap="3" className="mt-auto">
                            {testimonial.linkedin && (
                                <a
                                    href={testimonial.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-blue-600 hover:underline dark:text-blue-400"
                                >
                                    LinkedIn
                                </a>
                            )}
                        </Flexbox>
                    </Flexbox>
                ))}
            </Flexbox>

            <Flexbox direction="column" gap="8" className="mt-12">
                <Locale
                    variant="h2"
                    className="text-center text-xl font-bold md:text-2xl"
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
                            className="w-full max-w-sm overflow-hidden rounded-xl bg-white p-5 shadow-lg transition-all duration-300 hover:shadow-xl sm:p-6 dark:bg-gray-800"
                        >
                            <img
                                src={story.image}
                                alt={story.name.en}
                                className="h-40 w-full rounded-lg object-cover"
                            />
                            <Locale
                                variant="h3"
                                className="mt-4 text-lg font-bold text-gray-900 dark:text-white"
                            >
                                {story.name}
                            </Locale>
                            <Locale
                                variant="p"
                                className="text-primary-normal dark:text-primary-light text-sm"
                            >
                                {story.title}
                            </Locale>
                            <Locale
                                variant="p"
                                className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300"
                            >
                                {story.summary}
                            </Locale>
                            <a
                                href={story.link}
                                className="mt-4 inline-flex w-fit rounded bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                            >
                                <Locale>اقرأ القصة</Locale>
                            </a>
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

                <Separator orientation="horizontal" className="my-10" />

                <Flexbox
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={5}
                    className="rounded-2xl bg-amber-500 bg-gradient-to-br from-amber-700 p-8 text-center text-white shadow-xl"
                >
                    <Locale
                        variant="h2"
                        className="text-2xl font-bold text-white md:text-3xl"
                    >
                        {locales.cta.title}
                    </Locale>

                    <Button
                        className="h-2/3 w-1/4"
                        link={DISCOVER_ROUTES.base.routes["learning-tracks"]}
                        variant="primary"
                    >
                        <Locale>{locales.cta.button}</Locale>
                    </Button>
                </Flexbox>
            </Flexbox>
        </Flexbox>
    );
};
