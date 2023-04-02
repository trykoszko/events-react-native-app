// @TODO: add i18n lib/service
// @TODO: update keys to be more descriptive

const pl = {
    loginForm: {
        logo: '👋',
        hello: 'CYA',
        signInToContinue: 'Zaloguj się by kontynuować',
        form: {
            email: 'E-mail',
            password: 'Hasło',
            forgotPassword: 'Zapomniałem hasła',
            signIn: 'Zaloguj',
            error: 'Błąd',
            loggedInMessage: 'Witaj ponownie!',
            validation: {
                emailRequired: 'E-mail jest wymagany',
                emailLength: 'E-mail powinien być dłuższy niż 4 znaki',
                emailAt: 'E-mail powinien zawierać znak "@"',
                passwordRequired: 'Hasło jest wymagane',
                passwordLength: 'Hasło powinno być dłuższe niż 8 znaków',
            },
        },
        noAccount: {
            iAmNew: 'Nie masz jeszcze konta?',
            register: 'Zarejestruj się',
        },
        socialLoginButtons: {
            orSocials: 'Lub...',
            facebookLogin: 'Zaloguj się przez Facebook',
            instagramLogin: 'Zaloguj się przez Instagram',
            loggedInMessage: 'Cześć, ',
            cancelled: 'Logowanie nie powiodło się',
            fbError: 'Logowanie nie powiodło się'
        },
        errors: {
            failed: 'Logowanie nie powiodło się',
            unauthorized: 'E-mail lub hasło są nieprawidłowe',
        }
    },
    registerScreen: {
        title: 'Rejestracja',
        goBack: 'Powrót',
        defaultCity: 'Białystok',
        defaultCountry: 'Poland',
        form: {
            success: 'Twój profil został utworzony. Postępuj zgodnie ze wskazówkami, które wysłaliśmy na Twój e-mail',
            error: 'Błąd podczas tworzenia profilu',
            gender: 'Płeć',
            genders: {
                m: 'mężczyzna',
                k: 'kobieta'
            },
            email: 'E-mail',
            password: 'Hasło',
            firstName: 'Imię',
            lastName: 'Nazwisko',
            dob: 'Data urodzenia',
            dobSave: 'Zapisz',
            locationCity: 'Miasto',
            locationCountry: 'Kraj',
            bio: 'O Tobie',
            avatar: 'Zdjęcie',
            socials: {
                fbLink: 'Link do Facebooka',
                igLink: 'Link do Instagrama'
            },
            cities: ['Białystok'],
            submit: 'Zarejestruj',
            chooseDate: 'Wybierz datę',
            image: {
                title: 'Zdjęcie profilowe',
                delete: 'Usuń zdjęcie',
                noPermission: 'Nie wyraziłeś zgody na dostęp do biblioteki zdjęć',
                add: 'Wybierz zdjęcie'
            },
            subs: {
                email: 'Twój e-mail',
                password: 'Minimum 8 znaków',
                firstName: 'Twoje imię',
                lastName: 'Twoje nazwisko',
                bio: 'Opisz siebie w kilku słowach',
                avatar: 'Twoje zdjęcie'
            }
        }
    },
    forgotPasswordScreen: {
        goBack: 'Powrót',
        heading: 'Zapomniałeś hasła?',
        text: 'Wpisz poniżej swój e-mail - jeżeli jest w naszej bazie, wyślemy na niego instukcje jak zresetować hasło',
        email: 'Twój e-mail',
        submit: 'Wyślij',
        confirmation: 'Jeżeli wpisany e-mail jest w naszej bazie danych, zostaną na niego wysłane informacje o zmianie hasła'
    },
    bottomNavigation: {
        home: 'Home',
        events: 'Wydarzenia',
        invites: 'Zaproszenia',
        profile: 'Profil',
        login: 'Logowanie',
        register: 'Rejestracja'
    },
    homeScreen: {
        title: 'Wydarzenia blisko Ciebie',
        tip: 'Przesuń w prawo by dołączyć, w lewo by pominąć',
        noMoreEvents: 'Nie znaleźliśmy więcej wydarzeń',
        noMoreEventsCopy: 'Spróbuj wyszukać w innej kategorii lub przejdź do Twoich Wydarzeń',
        noMoreEventsOrCreate: 'lub...',
        participants: 'uczestników',
        freeSlots: 'wolne miejsca',
        isToday: 'Dzisiaj',
        in: 'Za',
        days: 'dni'
    },
    events: {
        requested: (eventTitle?: string) => `Wysłano prośbę o dołączenie do wydarzenia${eventTitle ? ' ' + eventTitle : ''}`,
        joined: (eventTitle?: string) => `Dołączyłeś do wydarzenia${eventTitle ? ' ' + eventTitle : ''}`,
        left: (eventTitle?: string) => `Opuściłeś wydarzenie${eventTitle ? ' ' + eventTitle : ''}`,
        deleted: (eventTitle?: string) => `Usunąłeś wydarzenie${eventTitle ? ' ' + eventTitle : ''}`,
        cancelled: (eventTitle?: string) => `Opuściłeś wydarzenie${eventTitle ? ' ' + eventTitle : ''}`,
        category: 'Kategoria',
        allCat: 'Wszystkie',
        errors: {
            eventFetch: 'Wystąpił problem z pobraniem wydarzeń',
            eventTypeFetch: 'Wystąpił problem z pobraniem kategorii wydarzeń',
            join: 'Wystąpił problem z dołączeniem do wydarzenia'
        },
        error: 'Wystąpił problem. Spróbuj ponownie później',
        noMore: 'Nie znaleźliśmy więcej wydarzeń. Spróbuj zmienić kategorię lub przejdź do zakładki Wydarzenia by przejrzeć wszystkie wydarzenia',
        addNew: 'Dodaj nowe wydarzenie'
    },
    eventsSwipableList: {
        yourEvents: {
            title: 'Twoje wydarzenia',
        },
        attendedEvents: {
            title: 'Wydarzenia w których uczestniczysz'
        },
        pendingEvents: {
            title: 'Wydarzenia do których chcesz dołączyć'
        }
    },
    goBack: 'Powrót',
    singleEventScreen: {
        host: 'Gospodarz',
        participants: 'Uczestnicy',
        joinRequests: 'Prośby o dołączenie',
        freeSlots: 'Zostało tylko %d wolnych miejsc',
        category: 'Kategoria',
        eventIsOpen: 'Wydarzenie otwarte',
        eventIsNotOpen: 'Zatwierdzenie wymagane',
        stats: {
            duration: 'Czas trwania',
            slots: 'Miejsca',
            participants: 'Uczestnicy',
            freeSlots: 'Wolne miejsca'
        },
        actions: {
            join: 'Dołącz do wydarzenia',
            leave: 'Opuść wydarzenie',
            edit: 'Edytuj wydarzenie',
            delete: 'Usuń wydarzenie',
            cancelJoinRequest: 'Anuluj',
            requestSent: 'Wysłałeś prośbę o dołączenie do wydarzenia',
            rejected: 'Gospodarz odrzucił Twoją prośbę o dołączenie do wydarzenia',
            cancel: 'Anuluj'
        },
        questions: {
            modalTitle: 'Zatwierdź wybór',
            join: 'Czy na pewno chcesz dołączyć do tego wydarzenia?',
            leave: 'Czy na pewno chcesz opuścić to wydarzenie?',
            delete: 'Czy na pewno chcesz usunąć to wydarzenie?',
            cancelJoinRequest: 'Czy na pewno chcesz wysłać prośbę o dołączenie do tego wydarzenia?'
        },
        modal: {
            submit: 'Tak',
            cancel: 'Anuluj'
        }
    },
    profileScreen: {
        settings: 'Ustawienia',
        title: 'Twój profil',
        loggedOut: 'Wylogowano pomyślnie',
        logOut: 'Wyloguj się',
        manageProfile: 'Edytuj profil',
        fields: {
            email: 'E-mail',
            dob: 'Data urodzenia',
            bio: 'O mnie',
            location: 'Lokalizacja',
            socialMedia: 'Social media',
        },
        editProfileModal: {
            title: 'Edytuj profil',
            save: 'Zapisz',
            add: 'Dodaj wydarzenie',
            cancel: 'Anuluj',
            cities: [
                'Białystok'
            ],
            fields: {
                dob: 'Data urodzenia',
                about: 'O mnie',
                fbLink: 'Link do profilu Facebook',
                igLink: 'Link do profilu Instagram',
                location: 'Lokalizacja'
            },
            updated: 'Twój profil został zaktualizowany'
        }
    },
    userScreen: {
        title: 'Profil użytkownika',
        back: 'Powrót',
        errors: {
            userFetch: 'Problem z pobraniem profilu'
        }
    },
    eventModal: {
        back: 'Powrót',
        addTitle: 'Dodaj wydarzenie',
        editTitle: (eventTitle: string) => `Edytuj wydarzenie: ${eventTitle}`,
        errors: {
            edit: 'Wystąpił problem z edycją wydarzenia',
            save: 'Wystąpił problem z tworzeniem wydarzenia'
        },
        success: 'Zapisano wydarzenie',
        form: {
            errors: {
                empty: 'To pole jest wymagane'
            },
            type: {
                title: 'Rodzaj wydarzenia'
            },
            title: {
                title: 'Nazwa wydarzenia',
                sub: 'Np. "Grill u Maćka", "Spacer z Labradorami"',
                errors: {
                    length: 'Nazwa wydarzenia powinna zawierać co najmniej 10 znaków',
                }
            },
            desc: {
                title: 'Opis wydarzenia',
                sub: 'Opis powinien zawierać wszystko, co chcesz przekazać uczestnikom. Na przykład co powinni ze sobą zabrać, opis Twojego psa, lokalizację spotkania',
                errors: {
                    length: 'Opis powinien zawierać co najmniej 20 znaków'
                }
            },
            location_city: {
                title: 'Miasto',
                sub: 'Póki co działamy tylko w Białymstoku',
                defaultValue: 'Białystok'
            },
            slots: {
                title: 'Ilość miejsc',
                sub: 'Wpisz maksymalną liczbę osób, które chcesz zaprosić do Twojego wydarzenia. Nie uwzględniaj w tym siebie',
                errors: {
                    length: 'Minimalna liczba uczestników to 1'
                }
            },
            date_time: {
                title: 'Data wydarzenia'
            },
            duration: {
                title: 'Czas trwania wydarzenia',
                units: {
                    days: (value: number) => value > 1 ? 'dni' : 'dzień',
                    hours: (value: number) => {
                        if (value === 1) {
                            return 'godzina'
                        }
                        if (value > 1 && value < 5) {
                            return 'godziny'
                        }
                        if (value >= 5) {
                            if (value >= 22 && value <= 24) {
                                return 'godziny'
                            }
                            return 'godzin'
                        }
                    },
                    minutes: 'minut'
                }
            },
            background_image_url: {
                title: 'Zdjęcie wydarzenia',
                sub: 'To zdjęcie wyświetli się na stronie wydarzenia',
                buttons: {
                    add: 'Wybierz zdjęcie z galerii',
                    delete: 'Usuń'
                },
                errors: {
                    noPermissions: 'Musisz zezwolić na dostęp do zdjęć by wybrać zdjęcie wydarzenia'
                }
            },
            is_open: {
                title: 'Każdy może dołączyć'
            },
            is_allowed_to_join_when_in_progress: {
                title: 'Można dołączyć do trwającego wydarzenia'
            }
        }
    }
};

// @TODO: check device language
export const i18n = pl;

export default i18n;
