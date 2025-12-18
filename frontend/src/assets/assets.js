//SHOP IMAGE

import shop_img1_1 from '../assets/shop_1.1.jpg'
import shop_img1_2 from '../assets/shop_1.2.jpg'
import shop_img2_1 from '../assets/shop_2.1.jpg'
import shop_img3_1 from '../assets/shop_3.1.jpg'
import shop_img4_1 from '../assets/shop_4.1.jpg'
import shop_img4_2 from '../assets/shop_4.2.jpg'
import shop_img4_3 from '../assets/shop_4.3.jpg'
import shop_img5_1 from '../assets/shop_5.1.jpg'
import shop_img6_1 from '../assets/shop_6.1.jpg'
import shop_img7_1 from '../assets/shop_7.1.jpg'
import shop_img8_1 from '../assets/shop_8.1.jpg'
import shop_img9_1 from '../assets/shop_9.1.jpg'
import shop_img10_1 from '../assets/shop_10.1.jpg'
import shop_img11_1 from '../assets/shop_11.1.jpg'
import shop_img12_1 from '../assets/shop_12.1.jpg'
import shop_img13_1 from '../assets/shop_13.1.jpg'
import shop_img14_1 from '../assets/shop_14.1.jpg'
import shop_img15_1 from '../assets/shop_15.1.jpg'
import shop_img16_1 from '../assets/shop_16.1.jpg'
import shop_img17_1 from '../assets/shop_17.1.jpg'
import shop_img18_1 from '../assets/shop_18.1.jpg'
import shop_img19_1 from '../assets/shop_19.1.jpg'
import shop_img20_1 from '../assets/shop_20.1.jpg'
import shop_img21_1 from '../assets/shop_21.1.jpg'
import shop_img22_1 from '../assets/shop_22.1.jpg'
import shop_img23_1 from '../assets/shop_23.1.jpg'
import shop_img24_1 from '../assets/shop_24.1.jpg'
import shop_img25_1 from '../assets/shop_25.1.jpg'
import shop_img26_1 from '../assets/shop_26.1.jpg'
import shop_img27_1 from '../assets/shop_27.1.jpg'
import shop_img28_1 from '../assets/shop_28.1.jpg'
import shop_img29_1 from '../assets/shop_29.1.jpg'
import shop_img30_1 from '../assets/shop_30.1.jpg'
import shop_img31_1 from '../assets/shop_31.1.jpg'

//ICON IMAGE

import dropdownIcon from './dropdown_icon.png'
import menuIcon from './menu_icon.png'
import profileIcon from './profile_icon.png'
import starIcon from './star_icon.png'

//EMPLOYEES IMAGE

import emp1_img from './p_img2.png'
import emp2_img from './p_img39.png'
import emp3_img from './p_img1.png'
import emp4_img from './p_img13.png'
import emp5_img from './hero_img.png'

export const assets = {
    dropdownIcon,
    menuIcon,
    profileIcon,
    starIcon
}

export const shops = [
    {
        _id: "aaaaa",
        name: "Morocca",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz",
        image: [shop_img1_1, shop_img1_2],
        category: "Women",
        salonType: "Kuaför",
        location: {
            city: "İstanbul",
            district: "Pendik",
            text: "Pendik/İstanbul"
        },
        rating: 4.6,
        services: [
            { _id: "srv1", name: "Nail Art", price: 300 },
            { _id: "srv2", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv3", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv4", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                description: "Ben sizlere en iyi hizmeti verebilmek için buradayım.",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür", "Saç Kesimi"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                description: "Ben sizlere en iyi hizmeti verebilmek için buradayım.",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            },
            {
                _id: "emp3",
                name: "Ebru Kınat",
                description: "Ben sizlere en iyi hizmeti verebilmek için buradayım.",
                image: [emp3_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            },
            {
                _id: "emp4",
                name: "Nuray Binicioğlu",
                description: "Ben sizlere en iyi hizmeti verebilmek için buradayım.",
                image: [emp4_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            },
            {
                _id: "emp5",
                name: "Beyza Koçak",
                description: "Ben sizlere en iyi hizmeti verebilmek için buradayım.",
                image: [emp5_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]
    },
    {
        _id: "aaaab",
        name: "Buchraiser",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img2_1],
        category: "Men",
        salonType: "Berber",
        location: {
            city: "İstanbul",
            district: "Kartal",
            text: "Kartal/İstanbul"
        },
        rating: 4.3,
        services: [
            { _id: "srv5", name: "Nail Art", price: 300 },
            { _id: "srv6", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv7", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv8", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür", "Saç Kesimi"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            },
            {
                _id: "emp3",
                name: "Ebru Kınat",
                image: [emp3_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]
    },
    {
        _id: "aaaac",
        name: "Soft",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img3_1],
        category: "Women",
        salonType: "Kuaför",
        location: {
            city: "İstanbul",
            district: "Maltepe",
            text: "Maltepe/İstanbul"
        },
        rating: 4.1,
        services: [
            { _id: "srv9", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv10", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Saç Kesimi"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Tırnak bakımı ve tırnak protezi"]
            }
        ]
    },
    {
        _id: "aaaad",
        name: "Berber Burak",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img4_1, shop_img4_2, shop_img4_3],
        category: "Men",
        salonType: "Berber",
        location: {
            city: "İstanbul",
            district: "Kaynarca",
            text: "Kaynarca/İstanbul"
        },
        rating: 4.0,
        services: [
            { _id: "srv11", name: "Nail Art", price: 300 },
            { _id: "srv12", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv13", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv14", name: "Saç Kesimi", price: 200 },
            { _id: "srv15", name: "Saç Kaynak", price: 100 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür", "Saç Kesimi", "Saç Kaynak"]
            },
            {
                _id: "emp3",
                name: "Ebru Kınat",
                image: [emp3_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]
    },
    {
        _id: "aaaae",
        name: "Kuaför Beyza",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img5_1],
        category: "Women",
        salonType: "Güzellik Merkezi",
        location: {
            city: "İstanbul",
            district: "Kurtköy",
            text: "Kurtköy/İstanbul"
        },
        rating: 3.9,
        services: [
            { _id: "srv16", name: "Nail Art", price: 300 },
            { _id: "srv17", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv18", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv19", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp5",
                name: "Beyza Koçak",
                image: [emp4_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp4",
                name: "Nuray Binicioğlu",
                image: [emp5_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]
    },
    {
        _id: "aaaaf",
        name: "Berber Harun",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img6_1],
        category: "Men",
        salonType: "Berber",
        location: {
            city: "İstanbul",
            district: "Esenler",
            text: "Esenler/İstanbul"
        },
        rating: 4.4,
        services: [
            { _id: "srv20", name: "Nail Art", price: 300 },
            { _id: "srv21", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv22", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv23", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]
    },
    {
        _id: "aaaag",
        name: "Lüx Hairdress",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img7_1],
        category: "Women",
        salonType: "Güzellik Merkezi",
        location: {
            city: "İstanbul",
            district: "Bağcılar",
            text: "Bağcılar/İstanbul"
        },
        rating: 3.5,
        services: [
            { _id: "srv24", name: "Nail Art", price: 300 },
            { _id: "srv25", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv26", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv27", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Saç Kesimi"]
            }
        ]
    },
    {
        _id: "aaaah",
        name: "Kevin Morphy",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img8_1],
        category: "Men",
        salonType: "Berber",
        location: {
            city: "İstanbul",
            district: "Kadıköy",
            text: "Kadıköy/İstanbul"
        },
        rating: 4.7,
        services: [
            { _id: "srv28", name: "Nail Art", price: 300 },
            { _id: "srv29", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv30", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv31", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]
    },
    {
        _id: "aaaai",
        name: "Cool Barber",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img9_1],
        category: "Men",
        salonType: "Berber",
        location: {
            city: "İstanbul",
            district: "Fatih",
            text: "Fatih/İstanbul"
        },
        rating: 4.8,
        services: [
            { _id: "srv32", name: "Nail Art", price: 300 },
            { _id: "srv33", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv34", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv35", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi", "Saç Kesimi"]
            }
        ]
    },
    {
        _id: "aaaaj",
        name: "Make Up",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img10_1],
        category: "Women",
        salonType: "Güzellik Merkezi",
        location: {
            city: "İstanbul",
            district: "Göztepe",
            text: "Göztepe/İstanbul"
        },
        rating: 4.5,
        services: [
            { _id: "srv36", name: "Nail Art", price: 300 },
            { _id: "srv37", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv38", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv39", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]
    },
    {
        _id: "aaaak",
        name: "Wait",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img11_1],
        category: "Men",
        salonType: "Berber",
        location: {
            city: "İstanbul",
            district: "Beykoz",
            text: "Beykoz/İstanbul"
        },
        rating: 3.4,
        services: [
            { _id: "srv40", name: "Nail Art", price: 300 },
            { _id: "srv41", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv42", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv43", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]
    },
    {
        _id: "aaaal",
        name: "Dövmece",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img12_1],
        category: "Women",
        salonType: "Kuaför",
        location: {
            city: "Ankara",
            district: "Pursaklar",
            text: "Pursaklar/Ankara"
        },
        rating: 3.1,
        services: [
            { _id: "srv44", name: "Nail Art", price: 300 },
            { _id: "srv45", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv46", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv47", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]
    },
    {
        _id: "aaaam",
        name: "Mor Kuaför",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img13_1],
        category: "Women",
        salonType: "Kuaför",
        location: {
            city: "Ankara",
            district: "Çubuk",
            text: "Çubuk/Ankara"
        },
        rating: 4.9,
        services: [
            { _id: "srv48", name: "Nail Art", price: 300 },
            { _id: "srv49", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv50", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv51", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]
    },
    {
        _id: "aaaan",
        name: "Tarz Kuaför",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img14_1],
        category: "Women",
        salonType: "Kuaför",
        location: {
            city: "Ankara",
            district: "Çankaya",
            text: "Çankaya/Ankara"
        },
        rating: 4.7,
        services: [
            { _id: "srv52", name: "Nail Art", price: 300 },
            { _id: "srv53", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv54", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv55", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp3",
                name: "Ebru Kınat",
                image: [emp3_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp4",
                name: "Nuray Binicioğlu",
                image: [emp5_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]

    },
    {
        _id: "aaaao",
        name: "Saade",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img15_1],
        category: "Women",
        salonType: "Kuaför",
        location: {
            city: "Ankara",
            district: "Ulus",
            text: "Ulus/Ankara"
        },
        rating: 4.2,
        services: [
            { _id: "srv56", name: "Nail Art", price: 300 },
            { _id: "srv57", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv58", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv59", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]

    },
    {
        _id: "aaaap",
        name: "Kuaför Selin",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img16_1],
        category: "Women",
        salonType: "Kuaför",
        location: {
            city: "Ankara",
            district: "Kızılay",
            text: "Kızılay/Ankara"
        },
        rating: 4.4,
        services: [
            { _id: "srv60", name: "Nail Art", price: 300 },
            { _id: "srv61", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv62", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv63", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]

    },
    {
        _id: "aaaar",
        name: "Fashion Hair Saloon",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img17_1],
        category: "Men",
        salonType: "Kuaför",
        location: {
            city: "Ankara",
            district: "Kahramankazan",
            text: "Kahramankazan/Ankara"
        },
        rating: 4.4,
        services: [
            { _id: "srv64", name: "Nail Art", price: 300 },
            { _id: "srv65", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv66", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv67", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]

    },
    {
        _id: "aaaas",
        name: "Barber Cut",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img18_1],
        category: "Men",
        salonType: "Berber",
        location: {
            city: "Ankara",
            district: "Keçiören",
            text: "Keçiören/Ankara"
        },
        rating: 3.0,
        services: [
            { _id: "srv68", name: "Nail Art", price: 300 },
            { _id: "srv69", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv70", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv71", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]

    },
    {
        _id: "aaaat",
        name: "Salon Aniello",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img19_1],
        category: "Men",
        salonType: "Berber",
        location: {
            city: "Ankara",
            district: "Çayyolu",
            text: "Çayyolu/Ankara"
        },
        rating: 2.0,
        services: [
            { _id: "srv72", name: "Nail Art", price: 300 },
            { _id: "srv73", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv74", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv75", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]

    },
    {
        _id: "aaaau",
        name: "Alley Barber Salon",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img20_1],
        category: "Men",
        salonType: "Berber",
        location: {
            city: "Bolu",
            district: "Mengen",
            text: "Mengen/Bolu"
        },
        rating: 4.1,
        services: [
            { _id: "srv76", name: "Nail Art", price: 300 },
            { _id: "srv77", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv78", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv79", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]

    },
    {
        _id: "aaaav",
        name: "CHAP&CO",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img21_1],
        category: "Men",
        salonType: "Berber",
        location: {
            city: "Bolu",
            district: "Merkez",
            text: "Merkez/Bolu"
        },
        rating: 5.0,
        services: [
            { _id: "srv80", name: "Nail Art", price: 300 },
            { _id: "srv81", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv82", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv83", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]

    },
    {
        _id: "aaaay",
        name: "Shaves&Trims",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img22_1],
        category: "Men",
        salonType: "Berber",
        location: {
            city: "Bolu",
            district: "Mudurnu",
            text: "Mudurnu/Bolu"
        },
        rating: 4.6,
        services: [
            { _id: "srv84", name: "Nail Art", price: 300 },
            { _id: "srv85", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv86", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv87", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]

    },
    {
        _id: "aaaaz",
        name: "Daginik",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img23_1],
        category: "Men",
        salonType: "Berber",
        location: {
            city: "Bolu",
            district: "Göynük",
            text: "Göynük/Bolu"
        },
        rating: 4.4,
        services: [
            { _id: "srv88", name: "Nail Art", price: 300 },
            { _id: "srv89", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv90", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv91", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]

    },
    {
        _id: "aaaba",
        name: "Kuaför JAPON ",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img24_1],
        category: "Women",
        salonType: "Kuaför",
        location: {
            city: "Bolu",
            district: "Gerede",
            text: "Gerede/Bolu"
        },
        rating: 4.2,
        services: [
            { _id: "srv92", name: "Nail Art", price: 300 },
            { _id: "srv93", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv94", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv95", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]

    },
    {
        _id: "aaabb",
        name: "Entel",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img25_1],
        category: "Women",
        salonType: "Kuaför",
        location: {
            city: "Sakarya",
            district: "Sapanca",
            text: "Sapanca/Sakarya"
        },
        rating: 3.9,
        services: [
            { _id: "srv96", name: "Nail Art", price: 300 },
            { _id: "srv97", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv98", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv99", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]

    },
    {
        _id: "aaabc",
        name: "Oldwell",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img26_1],
        category: "Women",
        salonType: "Kuaför",
        location: {
            city: "Bursa",
            district: "Mudanya",
            text: "Mudanya/Bursa"
        },
        rating: 4.8,
        services: [
            { _id: "srv100", name: "Nail Art", price: 300 },
            { _id: "srv101", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv102", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv103", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]

    },
    {
        _id: "aaabd",
        name: "Berber Japon",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img27_1],
        category: "Men",
        salonType: "Berber",
        location: {
            city: "Balıkesir",
            district: "Bandırma",
            text: "Bandırma/Balıkesir"
        },
        rating: 4.4,
        services: [
            { _id: "srv104", name: "Nail Art", price: 300 },
            { _id: "srv105", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv106", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv107", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]

    },
    {
        _id: "aaabf",
        name: "Kuaför Nice",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img28_1],
        category: "Women",
        salonType: "Kuaför",
        location: {
            city: "Balıkesir",
            district: "Ayvalık",
            text: "Ayvalık/Balıkesir"
        },
        rating: 4.4,
        services: [
            { _id: "srv108", name: "Nail Art", price: 300 },
            { _id: "srv109", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv110", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv111", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]
    },
    {
        _id: "aaabg",
        name: "Pacific Ocean",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img29_1],
        category: "Men",
        salonType: "Berber",
        location: {
            city: "Yalova",
            district: "Çınarcık",
            text: "Çınarcık/Yalova"
        },
        rating: 4.3,
        services: [
            { _id: "srv112", name: "Nail Art", price: 300 },
            { _id: "srv113", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv114", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv115", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]

    },
    {
        _id: "aaabh",
        name: "Berber Dar",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img30_1],
        category: "Men",
        salonType: "Berber",
        location: {
            city: "Ankara",
            district: "Bahçelievler",
            text: "Bahçelievler/Ankara"
        },
        rating: 3.6,
        services: [
            { _id: "srv116", name: "Nail Art", price: 300 },
            { _id: "srv117", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv118", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv119", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]

    },
    {
        _id: "aaabi",
        name: "Berber Mutlu",
        description: "Biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz biz bir güzellik merkeziyiz ",
        image: [shop_img31_1],
        category: "Men",
        salonType: "Berber",
        location: {
            city: "Ankara",
            district: "Gölbaşı",
            text: "Gölbaşı/Ankara"
        },
        rating: 3.7,
        services: [
            { _id: "srv120", name: "Nail Art", price: 300 },
            { _id: "srv121", name: "Manikür & Pedikür", price: 250 },
            { _id: "srv122", name: "Tırnak bakımı ve tırnak protezi", price: 400 },
            { _id: "srv123", name: "Saç Kesimi", price: 200 }
        ],
        employees: [
            {
                _id: "emp1",
                name: "Burhan Latif",
                image: [emp1_img],
                service: ["Nail Art", "Manikür & Pedikür"]
            },
            {
                _id: "emp2",
                name: "Emre Arslan",
                image: [emp2_img],
                service: ["Nail Art", "Manikür & Pedikür", "Tırnak bakımı ve tırnak protezi"]
            }
        ]

    },

]