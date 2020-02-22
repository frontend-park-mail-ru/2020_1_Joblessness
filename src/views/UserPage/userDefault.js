export default {
    user: {
        firstname: 'Имя',
        lastname: 'Фамилия',
        tag: '@username',
        avatar: 'default-avatar.jpg',
        mobile: 89123456789,
    },
    summaries: [
        {
            title: "Название резюме",
            contacts: {
                firstname: "Имя",
                lastname: "Фамилия",
                mobile: 89123456789,
                city: "Город",
            },
            info: {
                birth: {
                    year: 1900,
                    month: 1,
                    day: 1,
                },
                sex: "пол",
                country: "Гражданство",
                experience: "Опыт работы",
            },
            education: [
                {
                    degree: "Название университета",
                    start : {
                        year: 1900,
                        month: 1,
                        day: 1,
                    },
                    graduation : {
                        year: 1900,
                        month: 1,
                        day: 1,
                    },
                    faculty: "Название Факультета",
                    specialisation: "Название Специализации",

                }
            ]
        }
    ]
};