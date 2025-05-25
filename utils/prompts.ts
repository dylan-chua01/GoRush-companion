//Go Rush Knowledge
export const COMPANY_KNOWLEDGE = {
    name: "Go Rush",
    description: "Brunei's premier medical delivery service providing convenient medication collection and delivery",
    contact: {
      phone: "+673 233 2065",
      whatsapp: "+673 233 2065",
      email: "hello@gorushbn.com",
      address: "1st Floor, Block B, Bangunan Begawan Pehin Dato Hj Md Yusof, No 7, BSB BE1518",
      website: "https://www.gorushbn.com"
    },
    services: [
      "Pharmacy Deliveries",
      "Cross Border Service (Limbang)",
      "Local Delivery Services",
      "Shein Deliveries",
      "Temu Returns",
      "Freight Forwarding",
      "Custom Clearance",
      "Warehousing"
    ],
    pharmacyDeliveryRates: {
        MOH: [
          {
            district: "Brunei Muara",
            rates: [
              { type: "Immediate", description: "Within same day after medicine collected from Pharmacy", price: 20 },
              { type: "Express", description: "Next Working Day after medicine collected from Pharmacy", price: 5.5 },
              { type: "Standard", description: "2–3 Working Days", price: 4 },
              { type: "Self Collect", description: "Next Working Day", price: 4 }
            ]
          },
          {
            district: "Tutong",
            rates: [
              { type: "Standard", description: "2–3 Working Days", price: 4 },
              { type: "Self Collect", description: "Next Working Day", price: 4 }
            ]
          },
          {
            district: "Temburong",
            rates: [
              { type: "Standard", description: "2–3 Working Days", price: 4 },
              { type: "Self Collect", description: "Next Working Day", price: 4 }
            ]
          },
          {
            district: "Belait",
            rates: [
              { type: "Standard", description: "2–3 Working Days", price: 4 },
              { type: "Self Collect", description: "Next Working Day", price: 4 }
            ]
          }
        ],
        JPMC: [
          {
            district: "Brunei Muara",
            rates: [
              { type: "Express", description: "Next Working Day after medicine collected from Pharmacy", price: 5.5 },
              { type: "Standard", description: "2–3 Working Days", price: 4 },
              { type: "Self Collect", description: "Next Working Day", price: 4 }
            ]
          }
        ],
        Panaga: [
          {
            district: "Brunei Muara",
            rates: [
              { type: "Standard", description: "Same Day", price: 7 }
            ]
          }
        ]
      },
    banks: ["BIBD", "Baiduri"],
    faqs: {
      delivery: [
        {
          question: "Do you deliver from government clinics?",
          question_ms: "Adakah anda menghantar dari klinik kerajaan?",
          answer: "Yes. We pick up from MOH, JPMC/PJSC, or Panaga based on your appointment.",
          answer_ms: "Ya. Kami mengambil dari MOH, JPMC/PJSC, atau Panaga berdasarkan temujanji anda."
        },
        {
          question: "Difference between standard and express delivery?",
          question_ms: "Perbezaan antara penghantaran standard dan ekspres?",
          answer: "Standard: 2–3 working days. Express: Next working day after release.",
          answer_ms: "Standard: 2–3 hari bekerja. Ekspres: Hari bekerja berikutnya selepas pelepasan."
        }
      ],
      medication: [
        {
          question: "Some medications are missing, what should I do?",
          question_ms: "Ada ubat yang tiada, apa yang perlu saya lakukan?",
          answer: "Contact customer service at +6732332065 immediately.",
          answer_ms: "Hubungi perkhidmatan pelanggan di +6732332065 dengan segera."
        },
        {
          question: "I got the wrong meds. What now?",
          question_ms: "Saya dapat ubat yang salah. Sekarang bagaimana?",
          answer: "Call our customer service at +6732332065 to assist.",
          answer_ms: "Hubungi perkhidmatan pelanggan kami di +6732332065 untuk bantuan."
        }
      ],
      payment: [
        {
          question: "I'm a paying patient. Can you still deliver?",
          question_ms: "Saya pesakit bayar. Bolehkah anda masih menghantar?",
          answer: "Yes. You'll be contacted about payment. Extra charges apply depending on the amount.\n\nMOH: Under BND$100 = we pay first; Over = you pay us first. +$2 or 3% fee applies.\n\nJPMC/PJSC: We can pay for you (+$2/3%), or you pay directly and send proof.",
          answer_ms: "Ya. Anda akan dihubungi mengenai pembayaran. Caj tambahan dikenakan bergantung pada jumlah.\n\nMOH: Bawah BND$100 = kami bayar dulu; Atas = anda bayar kami dulu. +$2 atau 3% fi dikenakan.\n\nJPMC/PJSC: Kami boleh bayar untuk anda (+$2/3%), atau anda bayar terus dan hantar bukti."
        },
        {
          question: "What banks are available for bank transfer?",
          question_ms: "Bank mana yang tersedia untuk pemindahan bank?",
          answer: "BIBD and Baiduri only.",
          answer_ms: "BIBD dan Baiduri sahaja."
        }
      ],
      collection: [
        {
          question: "Can I self-collect from your office?",
          question_ms: "Boleh saya ambil sendiri dari pejabat anda?",
          answer: "Yes. Contact +6732332065 ahead of time.",
          answer_ms: "Ya. Hubungi +6732332065 terlebih dahulu."
        },
        {
          question: "What's your address?",
          question_ms: "Apa alamat anda?",
          answer: "1st Floor, Block B, Bangunan Begawan Pehin Dato Hj Md Yusof, No 7, BSB BE1518",
          answer_ms: "Tingkat 1, Blok B, Bangunan Begawan Pehin Dato Hj Md Yusof, No 7, BSB BE1518"
        }
      ]
    },
    paymentInstructions: {
      bibd: [
        "Step 1: BIBD App → Payment Services → Bill Payment",
        "Step 2: Select 'Go Rush Express'",
        "Ref 1: Your Tracking No. | Ref 2: Your Phone No."
      ],
      bibd_ms: [
        "Langkah 1: Aplikasi BIBD → Perkhidmatan Bayaran → Bayaran Bil",
        "Langkah 2: Pilih 'Go Rush Express'",
        "Ruj 1: No. Penjejakan Anda | Ruj 2: No. Telefon Anda"
      ]
    }
  };

  

  export const BRUNEI_KNOWLEDGE = {
    emergencyContacts: {
      police: {
        name: "Royal Brunei Police Force",
        number: "993",
        description: "For urgent police assistance or emergencies."
      },
      ambulance: {
        name: "Emergency Medical Ambulance Services",
        number: "991",
        description: "For medical emergencies requiring immediate response."
      },
      fireAndRescue: {
        name: "Fire and Rescue Department",
        number: "995",
        description: "For fire incidents or rescue emergencies."
      }
    },
  
    mentalHealthHelplines: [
      {
        name: "Talian Harapan 145",
        number: "145",
        description: "A confidential mental health helpline provided by the Ministry of Health. Available daily from 8am to 11pm.",
        languageSupport: ["Malay", "English"]
      },
      {
        name: "Brunei Mental Health Support Group (Reach)",
        contact: "Instagram: @reachbrunei",
        description: "Peer support for mental wellness and community engagement. Not a crisis service."
      }
    ],
  
    mentalHealthFacilities: [
      {
        name: "RIPAS Hospital – Dept. of Psychiatry",
        type: "Public (Hospital)",
        location: "Bandar Seri Begawan",
        contact: "+673 2242424",
        strengths: [
          "Integrated with national system",
          "Free or affordable",
          "Confidential"
        ],
        weaknesses: [
          "Long wait",
          "Limited specialists",
          "Social stigma"
        ]
      },
      {
        name: "The Mind Faculty @ Gleneagles JPMC",
        type: "Private (Clinic)",
        location: "Jerudong",
        contact: "+673 2611433",
        strengths: [
          "Fast appointment",
          "International standard",
          "Specialist access"
        ],
        weaknesses: [
          "Expensive",
          "Limited local coverage"
        ]
      },
      {
        name: "Relate Mental Health Bn",
        type: "NGO / Support Group",
        location: "Online / Community",
        contact: "Online only",
        strengths: [
          "Affordable",
          "Community-based",
          "Online support"
        ],
        weaknesses: [
          "Not a full-time clinic",
          "Limited hours"
        ]
      },
      {
        name: "Guardian Pharmacy",
        type: "Retail Pharmacy",
        location: "Various Locations",
        contact: "Branch-specific",
        strengths: [
          "Widespread",
          "International brand",
          "Health products"
        ],
        weaknesses: [
          "Limited prescription stock",
          "Expensive supplements"
        ]
      },
      {
        name: "JPMC Pharmacy",
        type: "Hospital Pharmacy",
        location: "Jerudong",
        contact: "+673 2611433",
        strengths: [
          "Hospital prescriptions",
          "Reliable",
          "Professional staff"
        ],
        weaknesses: [
          "Hospital hours only",
          "Pricey for walk-ins"
        ]
      },
      {
        name: "Panaga Health Centre Pharmacy",
        type: "Health Centre Pharmacy",
        location: "Kuala Belait / Seria",
        contact: "+673 3375711",
        strengths: [
          "Good Western med supply",
          "Serves expat community"
        ],
        weaknesses: [
          "Restricted access",
          "Needs prior registration"
        ]
      },
      {
        name: "Soon Lee Pharmacy",
        type: "Retail Pharmacy",
        location: "Various Locations",
        contact: "+673 2651531",
        strengths: [
          "Affordable generics",
          "Friendly service"
        ],
        weaknesses: [
          "Small inventory",
          "Limited English support"
        ]
      }
    ],
  
    supportGroups: [
      {
        name: "Mental Health Awareness Brunei (MHAB)",
        contact: "Instagram: @mentalhealthawarenessbn",
        description: "Non-profit organization promoting mental health awareness through campaigns and education."
      },
      {
        name: "Befrienders Brunei (Coming Soon)",
        status: "Planned support line in Brunei with trained volunteers for emotional support.",
        website: "https://www.befrienders.org.my"
      }
    ],
  
    culturalConsiderations: [
      "Mental health is still a sensitive topic in Brunei, and stigma can exist in families and communities.",
      "It is encouraged to speak with trusted individuals such as religious leaders, family members, or counselors.",
      "Religious guidance (e.g., from Islamic or Christian counselors) is often integrated into emotional support."
    ],
    clinicsByDistrict: {
        bruneiMuara: [
          "Raja Isteri Pengiran Anak Saleha Hospital",
          "Pengkalan Batu Health Centre",
          "Jubli Perak Sengkurong Health Centre",
          "Jubli Emas Kg Perpindahan Bunut Health Centre",
          "Pengiran Anak Puteri Hajah Rashidah Sa’adatul Bolkiah Health Centre",
          "Pengiran Anak Puteri Hajah Muta-Wakillah Hayatul Bolkiah Health Centre",
          "Rimba Dialysis Centre",
          "Berakas Health Centre",
          "Muara Health Centre",
          "Psychiatry Department, Ministry of Health",
          "Kg Bolkiah",
          "Sg Bunga",
          "JPMC",
          "PJSC"
        ],
        tutong: [
          "Pengiran Muda Mahkota Pengiran Muda Haji Al-Muhtadee Billah Hospital",
          "Telisai Health Centre",
          "Pekan Tutong Health Centre",
          "Sungai Kelugos Health Centre",
          "Lamunin Health Centre"
        ],
        temburong: [
          "Pengiran Isteri Hajah Mariam Hospital",
          "Bangar Health Clinic"
        ],
        belait: [
          "Suri Seri Begawan Hospital",
          "Kuala Belait Health Centre",
          "Seria Health Centre",
          "Sungai Liang Health Centre"
        ]
      }
  };
  