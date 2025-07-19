import { FC } from "react";
import { useMain } from "@/contexts";
import { useParams } from "react-router-dom";
import { Page } from "@/components/Page/Page";
import { Button } from "@/components/Button/Button";
import { Locale } from "@/components/Locale/Locale";
import { Flexbox } from "@/components/Flexbox/Flexbox";
import { PROFILE_ROUTES } from "@/routes/profile.routes";
import { useGetUserByID } from "@/services/Users/useGetUserByID";
import { REGISTRATION_ROUTES } from "@/routes/registration.routes";
import { useScrollRestoration } from "@/hooks/useScrollRestoration";
import { ProfileMainContent } from "./components/ProfileMainContent";
import { OfflineModal } from "@/components/OfflineModal/OfflineModal";
import { EnvironmentVariables } from "@/managers/EnvironmentVariables";
import { ApplicationBar } from "@/components/ApplicationBar/ApplicationBar";
import { useLocalization } from "@/components/LocalizationProvider/LocalizationProvider";
import { SearchResultDisplay } from "@/components/SearchResultDisplay/SearchResultDisplay";

import login_icon from "@icons/login.svg";
import signup_icon from "@icons/user.svg";
import logged_out_icon from "@icons/logged_out.svg";

import locales from "@localization/profile_page.json";
import route_locales from "@localization/profile_page_routes.json";

export const ProfilePage: FC = () => {
    useScrollRestoration();

    const { language, GetLocale } = useLocalization();
    const { profileID } = useParams<keyof typeof PROFILE_ROUTES.base.routes>();

    const { myUser } = useMain();
    const { data: userByID } = useGetUserByID(profileID, {
        usesSuspense: true,
        enabled: profileID != null,
    });

    const user = profileID == null ? myUser : userByID;

    return (
        <Page>
            <ApplicationBar
                routeLocales={route_locales}
                baseRoute={PROFILE_ROUTES.base.absolute}
                routes={Object.omit(PROFILE_ROUTES.base.routes, "profileID")}
            />

            {user != null ? (
                <ProfileMainContent user={user} />
            ) : profileID == null ? (
                <SearchResultDisplay
                    className="grow"
                    iconType="custom"
                    iconProps={{ source: logged_out_icon }}
                    title={GetLocale(
                        locales.display["logged-out"].title,
                        language
                    )}
                    paragraph={GetLocale(
                        locales.display["logged-out"].paragraph,
                        language
                    )}
                    buttons={
                        <Flexbox gap="4">
                            <Button
                                link={
                                    REGISTRATION_ROUTES.base.routes.signup
                                        .absolute
                                }
                                icon={{
                                    placement: "left",
                                    source: signup_icon,
                                }}
                            >
                                <Locale>{locales.buttons.signup}</Locale>
                            </Button>
                            <Button
                                variant="primary"
                                link={
                                    REGISTRATION_ROUTES.base.routes.login
                                        .absolute
                                }
                                icon={{
                                    placement: "right",
                                    source: login_icon,
                                }}
                            >
                                <Locale>{locales.buttons.login}</Locale>
                            </Button>
                        </Flexbox>
                    }
                />
            ) : (
                <SearchResultDisplay
                    className="grow"
                    iconType="empty"
                    title={GetLocale(
                        locales.display["not-found"].title,
                        language
                    )}
                    paragraph={GetLocale(
                        locales.display["not-found"].paragraph,
                        language
                    ).replace(/\*\*([^\*]+)\*\*/, `**"${profileID}"**`)}
                />
            )}

            {EnvironmentVariables.ENVIRONMENT == "production" && (
                <OfflineModal />
            )}
        </Page>
    );
};
