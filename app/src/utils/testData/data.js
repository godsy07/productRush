export const categories = [
    { id: 1, name: "fashion" },
    { id: 2, name: "electronics" },
    { id: 3, name: "cosmetics" },
]

export const sub_categories = [
    { id: 1, category: 1, name: "T-Shirt" },
    { id: 2, category: 1, name: "formal shirt" },
    { id: 3, category: 1, name: "saree" },
    { id: 4, category: 1, name: "kids" },
    { id: 5, category: 1, name: "shoes" },
    { id: 6, category: 1, name: "socks" },
    { id: 7, category: 2, name: "mobile phone" },
    { id: 8, category: 2, name: "laptop" },
    { id: 9, category: 2, name: "tv" },
    { id: 10, category: 2, name: "earphone" },
    { id: 11, category: 2, name: "speaker" },
    { id: 12, category: 3, name: "facewash" },
    { id: 12, category: 3, name: "hair oil" },
    { id: 13, category: 3, name: "facecream" },
]

export const items = [
    { id: 1, category: "cosmetics", sub_category:"facecream", name: "Glow and Shine", brand:"Glow", model: "", price: "30", amountOrWeight: '50', qty: 50, image_url: "", createdAt: (new Date('22 January 2022 11:10 UTC').toISOString()) },
    { id: 2, category: "cosmetics", sub_category:"facecream", name: "Glow and Shine", brand:"Glow", model: "", price: "50", amountOrWeight: '100', qty: 112, image_url: "", createdAt: (new Date('15 April 2021 05:15 UTC').toISOString()) },
    { id: 3, category: "cosmetics", sub_category:"facecream", name: "Fresh and CLean", brand:"Clear", model: "", price: "45", amountOrWeight: '100', qty: 47, image_url: "", createdAt: (new Date('08 October 2022 09:13 UTC').toISOString()) },
    { id: 4, category: "electronics", sub_category:"earphone", name: "Earphone", brand:"Zap", model: "Zap-J45", price: "250", amountOrWeight: '300', qty: 143, image_url: "", createdAt: (new Date('14 November 2023 10:00 UTC').toISOString()) },
    { id: 5, category: "fashion", sub_category:"saree", name: "Sambalpuri Saree", brand:"Shine", model: "", price: "520", amountOrWeight: '300', qty: 143, image_url: "", createdAt: (new Date('24 November 2023 14:52 UTC').toISOString()) },
    { id: 5, category: "fashion", sub_category:"shoes", name: "Running Shoes", brand:"Speed", model: "speed-ws-132", price: "840", amountOrWeight: '300', qty: 143, image_url: "", createdAt: (new Date('29 January 2021 20:14 UTC').toISOString()) },
]
