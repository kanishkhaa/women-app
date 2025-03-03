import React, { useState, useEffect } from "react";
import {
  ExternalLink,
  CheckCircle,
  X,
  Search,
  Filter,
  Users,
  Book,
  Briefcase,
  Heart,
  Bookmark
} from "lucide-react";

const schemes = [
  {
    id: 1,
    title: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
    category: "Healthcare",
    description:
      "A maternity benefit program providing financial assistance to pregnant and lactating women for the first live birth.",
    benefits: [
      "Cash incentive of ₹5,000 in three installments",
      "Encourages institutional deliveries",
      "Promotes health and nutrition for mother and child",
    ],
    eligibility:
      "Pregnant women and lactating mothers for the first live birth",
    link: "https://pmmvy-cas.nic.in/",
  },
  {
    id: 2,
    title: "Women’s Helpline Scheme",
    category: "Women Empowerment",
    description:
      "A 24/7 helpline for women affected by violence, providing support and information.",
    benefits: [
      "Immediate assistance and counseling",
      "Referral to appropriate authorities",
      "Support for legal and medical aid",
    ],
    eligibility: "Women in distress",
    link: "https://wcd.nic.in/schemes/womens-helpline-scheme",
  },
  {
    id: 3,
    title: "Mahila Samakhya Yojana",
    category: "Education",
    description:
      "A program aimed at empowering women through education and awareness.",
    benefits: [
      "Promotes women's education",
      "Encourages community participation",
      "Supports women's self-help groups",
    ],
    eligibility: "Women in rural and urban areas",
    link: "https://wcd.nic.in/schemes/mahila-samakhya-yojana",
  },
  {
    id: 4,
    title:
      "Financial incentive for wards of ex-servicemen undergoing cadet training at NDA",
    category: "Defence",
    description:
      "Financial assistance for the children of ex-servicemen undergoing training at the National Defence Academy.",
    benefits: [
      "Financial support for education and training",
      "Encourages participation in defence services",
    ],
    eligibility: "Wards of ex-servicemen",
    link: "https://www.india.gov.in/",
  },
  {
    id: 5,
    title: "Kilkari messages",
    category: "Healthcare",
    description:
      "A mobile health messaging service providing timely information about pregnancy and child health.",
    benefits: [
      "Weekly voice messages on pregnancy and child health",
      "Promotes awareness and healthy practices",
    ],
    eligibility: "Pregnant women and new mothers",
    link: "https://kilkari.nhp.gov.in/",
  },
  {
    id: 6,
    title: "Facing trouble with pregnancy",
    category: "Healthcare",
    description:
      "Support and guidance for women facing difficulties during pregnancy.",
    benefits: [
      "Access to medical advice",
      "Referral to healthcare facilities",
      "Emotional and psychological support",
    ],
    eligibility: "Pregnant women",
    link: "https://www.nhp.gov.in/",
  },
  {
    id: 7,
    title: "Maternity Benefit Amendment Act 2017 for Leave",
    category: "Labour and Employment",
    description:
      "An amendment to the Maternity Benefit Act, 1961, increasing the duration of paid maternity leave.",
    benefits: [
      "Paid maternity leave extended to 26 weeks",
      "Work from home option after maternity leave",
    ],
    eligibility: "Working women",
    link: "https://labour.gov.in/",
  },
  {
    id: 8,
    title:
      "Financial assistance for vocational training of widows of ex-servicemen",
    category: "Defence",
    description:
      "Financial support for vocational training to help widows of ex-servicemen become self-reliant.",
    benefits: [
      "Financial aid for vocational courses",
      "Skill development and employment opportunities",
    ],
    eligibility: "Widows of ex-servicemen",
    link: "https://www.india.gov.in/",
  },
  {
    id: 9,
    title: "National Health Portal",
    category: "Healthcare",
    description:
      "A comprehensive portal providing authentic information on diseases, conditions, and healthcare services.",
    benefits: [
      "Access to reliable health information",
      "Guidance on healthcare services and facilities",
    ],
    eligibility: "General public",
    link: "https://www.nhp.gov.in/",
  },
  {
    id: 10,
    title: "Sukanya Samriddhi Yojana",
    category: "Financial Inclusion",
    description:
      "A savings scheme for the financial inclusion of girl children.",
    benefits: [
      "High interest rate",
      "Tax benefits",
      "Encourages savings for girl child's future",
    ],
    eligibility: "Parents/guardians of girl children below 10 years",
    link: "https://www.indiapost.gov.in/",
  },
  {
    id: 11,
    title: "Mahila Adhikarita Yojana (Loans to Safai Karamcharis Women)",
    category: "Women Empowerment",
    description:
      "A scheme providing loans to women safai karamcharis for their economic empowerment.",
    benefits: [
      "Low-interest loans",
      "Financial independence for women safai karamcharis",
    ],
    eligibility: "Women safai karamcharis",
    link: "https://wcd.nic.in/",
  },
  {
    id: 12,
    title: "Grant in Aid on Child and Women Labour",
    category: "Labour and Employment",
    description:
      "Financial assistance to organizations working towards the eradication of child and women labour.",
    benefits: [
      "Support for rehabilitation and education of child and women labourers",
      "Promotes awareness and prevention",
    ],
    eligibility: "NGOs and organizations working in this field",
    link: "https://labour.gov.in/",
  },
  {
    id: 13,
    title:
      "Provisions for women under National Mission for Sustainable Agriculture (NMSA)",
    category: "Agriculture",
    description:
      "Initiatives to promote sustainable agricultural practices among women farmers.",
    benefits: [
      "Training and capacity building",
      "Access to resources and technology",
      "Financial support for sustainable practices",
    ],
    eligibility: "Women farmers",
    link: "https://agricoop.nic.in/",
  },
  {
    id: 14,
    title: "Agricultural mechanization for women farmers",
    category: "Agriculture",
    description:
      "Promoting the use of modern agricultural machinery among women farmers.",
    benefits: [
      "Access to modern farming equipment",
      "Increased productivity and efficiency",
      "Reduction in manual labour",
    ],
    eligibility: "Women farmers",
    link: "https://agricoop.nic.in/",
  },
  {
    id: 15,
    title:
      "Promoting women under National Mission on Oilseeds & Oil Palm (NMOOP)",
    category: "Agriculture",
    description:
      "Encouraging women's participation in oilseeds and oil palm cultivation.",
    benefits: [
      "Training and capacity building",
      "Financial incentives",
      "Access to resources and technology",
    ],
    eligibility: "Women farmers",
    link: "https://agricoop.nic.in/",
  },
  {
    id: 16,
    title: "Provisions for women under National Food Security Mission",
    category: "Agriculture",
    description:
      "Initiatives to enhance food security through women's participation in agriculture.",
    benefits: [
      "Training and capacity building",
      "Access to resources and technology",
      "Financial support",
    ],
    eligibility: "Women farmers",
    link: "https://agricoop.nic.in/",
  },
  {
    id: 17,
    title:
      "Benefits for women under Mission for Integrated Development of Horticulture",
    category: "Agriculture",
    description:
      "Promoting horticulture among women farmers for sustainable income generation.",
    benefits: [
      "Training and capacity building",
      "Access to resources and technology",
      "Financial support",
    ],
    eligibility: "Women farmers",
    link: "https://agricoop.nic.in/",
  },
  {
    id: 18,
    title: "Reaching women farmers through mass media",
    category: "Agriculture",
    description:
      "Using mass media to disseminate information and best practices to women farmers.",
    benefits: [
      "Access to information and best practices",
      "Increased awareness and knowledge",
    ],
    eligibility: "Women farmers",
    link: "https://agricoop.nic.in/",
  },
  {
    id: 19,
    title:
      "Provisions for women farmers in Agriculture Technology Management Agency (ATMA) Scheme",
    category: "Agriculture",
    description:
      "Supporting women farmers through training, resources, and technology under the ATMA scheme.",
    benefits: [
      "Training and capacity building",
      "Access to resources and technology",
      "Financial support",
    ],
    eligibility: "Women farmers",
    link: "https://agricoop.nic.in/",
  },
  {
    id: 20,
    title:
      "Pradhan Mantri Awas Yojana (PMAY) Gramin for women’s affordable housing",
    category: "Housing",
    description: "Providing affordable housing to women in rural areas.",
    benefits: [
      "Financial assistance for house construction",
      "Ownership of house in the name of women",
    ],
    eligibility: "Women in rural areas",
    link: "https://pmayg.nic.in/",
  },
  {
    id: 21,
    title: "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)",
    category: "Employment",
    description:
      "A social security measure that aims to guarantee the 'right to work' by providing at least 100 days of wage employment in a financial year.",
    benefits: [
      "Guaranteed wage employment",
      "Promotes livelihood security",
      "Encourages women's participation",
    ],
    eligibility: "Rural households",
    link: "https://nrega.nic.in/",
  },
  {
    id: 22,
    title: "Recurring Grant for War Memorial Hostels",
    category: "Defence",
    description:
      "Financial assistance for the maintenance and operation of war memorial hostels.",
    benefits: [
      "Support for the upkeep of hostels",
      "Ensures a dignified living environment",
    ],
    eligibility: "War memorial hostels",
    link: "https://www.india.gov.in/",
  },
  {
    id: 23,
    title: "Financial assistance to orphaned children of ex-servicemen",
    category: "Defence",
    description:
      "Financial support for the education and welfare of orphaned children of ex-servicemen.",
    benefits: ["Financial aid for education", "Support for overall welfare"],
    eligibility: "Orphaned children of ex-servicemen",
    link: "https://www.india.gov.in/",
  },
  {
    id: 24,
    title:
      "Financial assistance for education of children/widows of Ex-servicemen",
    category: "Defence",
    description:
      "Financial aid for the education of children and widows of ex-servicemen.",
    benefits: [
      "Financial support for education",
      "Promotes educational opportunities",
    ],
    eligibility: "Children and widows of ex-servicemen",
    link: "https://www.india.gov.in/",
  },
  {
    id: 25,
    title: "Shyama Prasad Mukherji Rurban Mission",
    category: "Rural Development",
    description:
      "A scheme aimed at developing rural areas by providing economic, social, and physical infrastructure facilities.",
    benefits: [
      "Development of rural areas",
      "Improved infrastructure and services",
    ],
    eligibility: "Rural areas",
    link: "https://rurban.gov.in/",
  },
  {
    id: 26,
    title: "Saansad Adarsh Gram Yojana",
    category: "Rural Development",
    description: "A scheme for the holistic development of selected villages.",
    benefits: [
      "Development of model villages",
      "Improved infrastructure and services",
    ],
    eligibility: "Selected villages",
    link: "https://saanjhi.gov.in/",
  },
  {
    id: 27,
    title: "Deen Dayal Upadhyaya Grameen Kaushalya Yojana (DDU-GKY)",
    category: "Skill Development",
    description:
      "A skill development program aimed at rural youth, providing them with industry-relevant skills.",
    benefits: [
      "Skill training and placement",
      "Financial support for training",
    ],
    eligibility: "Rural youth",
    link: "https://ddugky.gov.in/",
  },
  {
    id: 28,
    title: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
    category: "Skill Development",
    description:
      "A skill certification initiative to enable Indian youth to take up industry-relevant skill training.",
    benefits: [
      "Skill training and certification",
      "Financial rewards for certification",
    ],
    eligibility: "Indian youth",
    link: "https://www.pmkvyofficial.org/",
  },
  {
    id: 29,
    title: "Pradhan Mantri Gram Sadak Yojana (PMGSY)",
    category: "Infrastructure",
    description:
      "A scheme to provide all-weather road connectivity to rural areas.",
    benefits: [
      "Improved road connectivity",
      "Enhanced access to markets and services",
    ],
    eligibility: "Rural areas",
    link: "https://pmgsy.nic.in/",
  },
  {
    id: 30,
    title:
      "National Family Benefit Scheme (NFBS) for assistance in case of death of breadwinner",
    category: "Social Security",
    description:
      "Financial assistance to families in case of the death of the primary breadwinner.",
    benefits: [
      "One-time financial assistance",
      "Support for the bereaved family",
    ],
    eligibility: "Families below the poverty line",
    link: "https://nsap.nic.in/",
  },
  {
    id: 31,
    title: "Technology Development and Utilization Programme for Women (TDUPW)",
    category: "Technology",
    description:
      "Promoting the development and utilization of technology for the benefit of women.",
    benefits: [
      "Access to technology and training",
      "Promotes innovation and entrepreneurship",
    ],
    eligibility: "Women entrepreneurs and organizations",
    link: "https://dst.gov.in/",
  },
  {
    id: 32,
    title: "AICTE Pragati scholarship for girl students",
    category: "Education",
    description: "Scholarship for girl students pursuing technical education.",
    benefits: [
      "Financial support for education",
      "Encourages technical education among girls",
    ],
    eligibility: "Girl students in technical courses",
    link: "https://www.aicte-india.org/",
  },
  {
    id: 33,
    title: "AICTE Saksham Scholarship Scheme for girl students",
    category: "Education",
    description:
      "Scholarship for differently-abled girl students pursuing technical education.",
    benefits: [
      "Financial support for education",
      "Encourages technical education among differently-abled girls",
    ],
    eligibility: "Differently-abled girl students in technical courses",
    link: "https://www.aicte-india.org/",
  },
  {
    id: 34,
    title:
      "Provisions for women at Indira Gandhi National Open University (IGNOU)",
    category: "Education",
    description: "Special provisions and support for women students at IGNOU.",
    benefits: ["Flexible learning options", "Support for women's education"],
    eligibility: "Women students",
    link: "https://www.ignou.ac.in/",
  },
  {
    id: 35,
    title: "Day care centres in Universities and Colleges",
    category: "Education",
    description:
      "Establishment of day care centres in educational institutions to support women students and staff.",
    benefits: ["Support for women with children", "Promotes work-life balance"],
    eligibility: "Women students and staff",
    link: "https://www.education.gov.in/",
  },
  {
    id: 36,
    title: "Scholarship for college and university students",
    category: "Education",
    description:
      "Financial assistance for college and university students to support their education.",
    benefits: [
      "Financial support for education",
      "Encourages higher education",
    ],
    eligibility: "College and university students",
    link: "https://www.education.gov.in/",
  },
  {
    id: 37,
    title: "Hunar Se Rozgar Tak",
    category: "Skill Development",
    description:
      "A skill development program aimed at providing employment opportunities to youth.",
    benefits: [
      "Skill training and placement",
      "Financial support for training",
    ],
    eligibility: "Youth",
    link: "https://www.tourism.gov.in/",
  },
  {
    id: 38,
    title: "NRI marriages",
    category: "Legal",
    description:
      "Legal assistance and support for Indian women in NRI marriages.",
    benefits: ["Legal advice and support", "Protection of rights"],
    eligibility: "Indian women in NRI marriages",
    link: "https://www.mha.gov.in/",
  },
  {
    id: 39,
    title: "Prevention of Sexual Harassment at the Workplace",
    category: "Legal",
    description:
      "Measures and guidelines to prevent and address sexual harassment at the workplace.",
    benefits: ["Safe working environment", "Legal recourse for victims"],
    eligibility: "Working women",
    link: "https://wcd.nic.in/",
  },
  {
    id: 40,
    title: "Reporting Violence",
    category: "Legal",
    description:
      "Guidelines and support for reporting incidents of violence against women.",
    benefits: ["Access to legal recourse", "Support and counseling"],
    eligibility: "Women facing violence",
    link: "https://wcd.nic.in/",
  },
  {
    id: 41,
    title: "Facing Trouble in Marriage",
    category: "Legal",
    description:
      "Support and guidance for women facing difficulties in their marriage.",
    benefits: ["Legal advice and support", "Counseling and mediation"],
    eligibility: "Married women",
    link: "https://wcd.nic.in/",
  },
  {
    id: 42,
    title: "Tips for your job search",
    category: "Employment",
    description: "Guidance and tips for women seeking employment.",
    benefits: ["Job search strategies", "Career counseling"],
    eligibility: "Women seeking employment",
    link: "https://www.labour.gov.in/",
  },
  {
    id: 43,
    title: "Forms of Violence Against Women",
    category: "Legal",
    description:
      "Information and support on different forms of violence against women.",
    benefits: ["Awareness and education", "Legal recourse and support"],
    eligibility: "Women facing violence",
    link: "https://wcd.nic.in/",
  },
  {
    id: 44,
    title: "Vidyalakshmi Portal for Education Loans",
    category: "Education",
    description:
      "A portal providing information and access to education loans for students.",
    benefits: ["Access to education loans", "Simplified application process"],
    eligibility: "Students",
    link: "https://www.vidyalakshmi.co.in/",
  },
  {
    id: 45,
    title:
      "Pradhan Mantri Surakshit Matritva Abhiyan for free health services for mothers.",
    category: "Healthcare",
    description:
      "A program providing free health check-ups and services for pregnant women.",
    benefits: [
      "Free antenatal check-ups",
      "Ensures safe pregnancy and delivery",
    ],
    eligibility: "Pregnant women",
    link: "https://www.nhp.gov.in/",
  },
  {
    id: 46,
    title: "Child Helpline number 1098",
    category: "Child Welfare",
    description: "A 24/7 helpline for children in need of care and protection.",
    benefits: [
      "Immediate assistance and support",
      "Referral to appropriate services",
    ],
    eligibility: "Children in need of care and protection",
    link: "https://www.childlineindia.org/",
  },
  {
    id: 47,
    title:
      "Nai Roshni Scheme – Leadership development for women from Minorities",
    category: "Women Empowerment",
    description:
      "A leadership development program for women from minority communities.",
    benefits: ["Leadership training", "Empowerment and skill development"],
    eligibility: "Women from minority communities",
    link: "https://www.minorityaffairs.gov.in/",
  },
  {
    id: 48,
    title: "Legal literacy for women",
    category: "Legal",
    description:
      "Programs to enhance legal awareness and literacy among women.",
    benefits: ["Increased legal knowledge", "Empowerment through awareness"],
    eligibility: "Women",
    link: "https://wcd.nic.in/",
  },
  {
    id: 49,
    title: "Loans for small businesses to women in PMMY",
    category: "Financial Inclusion",
    description:
      "Providing loans to women entrepreneurs under the Pradhan Mantri Mudra Yojana.",
    benefits: [
      "Access to credit for small businesses",
      "Promotes entrepreneurship among women",
    ],
    eligibility: "Women entrepreneurs",
    link: "https://www.mudra.org.in/",
  },
  {
    id: 50,
    title: "LPG Connections to Women in PM Ujjwala Yojana",
    category: "Social Welfare",
    description:
      "Providing free LPG connections to women from below poverty line households.",
    benefits: ["Access to clean cooking fuel", "Improved health and safety"],
    eligibility: "Women from BPL households",
    link: "https://www.pmujjwalayojana.com/",
  },
  {
    id: 51,
    title:
      "Promoting Women SHGs through National Rural Livelihood Mission (NRLM)",
    category: "Women Empowerment",
    description:
      "Supporting women's self-help groups for economic empowerment.",
    benefits: ["Financial inclusion", "Skill development and entrepreneurship"],
    eligibility: "Women in rural areas",
    link: "https://aajeevika.gov.in/",
  },
  {
    id: 52,
    title: "Panic Button For Women",
    category: "Safety",
    description:
      "A safety feature on mobile phones to alert authorities in case of emergency.",
    benefits: [
      "Immediate assistance in emergencies",
      "Enhanced safety for women",
    ],
    eligibility: "Women with mobile phones",
    link: "https://www.digitalindia.gov.in/",
  },
  {
    id: 53,
    title: "Stand Up India Scheme to promote entrepreneurship",
    category: "Financial Inclusion",
    description:
      "A scheme to promote entrepreneurship among women and SC/ST communities.",
    benefits: [
      "Access to bank loans",
      "Support for setting up greenfield enterprises",
    ],
    eligibility: "Women and SC/ST entrepreneurs",
    link: "https://www.standupmitra.in/",
  },
  {
    id: 54,
    title: "33% reservation in Panchayats (73rd Constitutional Amendment Act)",
    category: "Governance",
    description:
      "Reservation of one-third of seats for women in Panchayati Raj institutions.",
    benefits: [
      "Increased participation of women in local governance",
      "Empowerment and representation",
    ],
    eligibility: "Women in rural areas",
    link: "https://www.panchayat.gov.in/",
  },
  {
    id: 55,
    title: "Skill Training of Rural Youth on Farm and Non-Farm Activities",
    category: "Skill Development",
    description:
      "Training rural youth in farm and non-farm activities for livelihood enhancement.",
    benefits: ["Skill development", "Increased employment opportunities"],
    eligibility: "Rural youth",
    link: "https://rural.nic.in/",
  },
  {
    id: 56,
    title: "Scheme of Shelters for Urban Homeless (SUH)",
    category: "Social Welfare",
    description:
      "Providing shelters and basic amenities to the urban homeless.",
    benefits: [
      "Access to shelter and basic amenities",
      "Improved living conditions",
    ],
    eligibility: "Urban homeless",
    link: "https://mohua.gov.in/",
  },
  {
    id: 57,
    title: "PM Awas Yojana Common Service Centres for affordable housing",
    category: "Housing",
    description:
      "Facilitating access to affordable housing through Common Service Centres.",
    benefits: [
      "Simplified application process",
      "Access to affordable housing",
    ],
    eligibility: "Eligible beneficiaries",
    link: "https://pmaymis.gov.in/",
  },
  {
    id: 58,
    title: "Services for women passengers in Indian Railways",
    category: "Transport",
    description:
      "Special services and facilities for women passengers in Indian Railways.",
    benefits: ["Enhanced safety and comfort", "Dedicated facilities for women"],
    eligibility: "Women passengers",
    link: "https://www.indianrailways.gov.in/",
  },
  {
    id: 59,
    title: "Ujjawala scheme for victims of trafficking",
    category: "Social Welfare",
    description:
      "A comprehensive scheme for prevention, rescue, and rehabilitation of victims of trafficking.",
    benefits: [
      "Rescue and rehabilitation",
      "Support for reintegration into society",
    ],
    eligibility: "Victims of trafficking",
    link: "https://wcd.nic.in/",
  },
  {
    id: 60,
    title: "National Scholarship Portal",
    category: "Education",
    description:
      "A portal for applying to various scholarships offered by the government.",
    benefits: [
      "Access to multiple scholarships",
      "Simplified application process",
    ],
    eligibility: "Students",
    link: "https://scholarships.gov.in/",
  },
  {
    id: 61,
    title: "Want to report violence? – Mahila Police Volunteer",
    category: "Legal",
    description:
      "A initiative to involve women in policing and reporting of violence against women.",
    benefits: [
      "Increased reporting of violence",
      "Community involvement in policing",
    ],
    eligibility: "Women",
    link: "https://wcd.nic.in/",
  },
  {
    id: 62,
    title:
      "Vocational/skill training – Support to Training and Employment Programme (STEP) for Women",
    category: "Skill Development",
    description: "Skill training and employment support for women.",
    benefits: ["Skill development", "Employment opportunities"],
    eligibility: "Women",
    link: "https://wcd.nic.in/",
  },
  {
    id: 63,
    title:
      "Vocational/skill training – Employment through Skill Training and Placement",
    category: "Skill Development",
    description: "Skill training and placement support for women.",
    benefits: ["Skill development", "Employment opportunities"],
    eligibility: "Women",
    link: "https://wcd.nic.in/",
  },
  {
    id: 64,
    title: "Residential schools for tribal girls",
    category: "Education",
    description:
      "Providing quality education to tribal girls through residential schools.",
    benefits: [
      "Access to quality education",
      "Safe and supportive environment",
    ],
    eligibility: "Tribal girls",
    link: "https://tribal.nic.in/",
  },
  {
    id: 65,
    title: "Safety of women in Panchayats",
    category: "Governance",
    description:
      "Measures to ensure the safety and security of women in Panchayats.",
    benefits: [
      "Safe working environment",
      "Increased participation of women in governance",
    ],
    eligibility: "Women in Panchayats",
    link: "https://www.panchayat.gov.in/",
  },
  {
    id: 66,
    title: "Strengthening Education among ST Girls in Low Literacy Districts",
    category: "Education",
    description:
      "Initiatives to improve education among ST girls in low literacy districts.",
    benefits: ["Access to quality education", "Increased literacy rates"],
    eligibility: "ST girls in low literacy districts",
    link: "https://tribal.nic.in/",
  },
  {
    id: 67,
    title:
      "Trade Related Entrepreneurship Assistance and Development (TREAD) Scheme for Women",
    category: "Financial Inclusion",
    description:
      "Supporting women entrepreneurs through training and financial assistance.",
    benefits: [
      "Access to credit and training",
      "Promotes entrepreneurship among women",
    ],
    eligibility: "Women entrepreneurs",
    link: "https://msme.gov.in/",
  },
  {
    id: 68,
    title: "Science & Engineering Research Board Women Excellence Award",
    category: "Science and Technology",
    description:
      "Award to recognize and promote excellence in science and engineering among women.",
    benefits: [
      "Recognition and financial reward",
      "Encourages women in science and engineering",
    ],
    eligibility: "Women scientists and engineers",
    link: "https://serb.gov.in/",
  },
  {
    id: 69,
    title: "National Gender Resource Centre for Agriculture (NGRCA Scheme)",
    category: "Agriculture",
    description:
      "Promoting gender equality in agriculture through research and development.",
    benefits: [
      "Gender-sensitive agricultural practices",
      "Empowerment of women farmers",
    ],
    eligibility: "Women farmers",
    link: "https://agricoop.nic.in/",
  },
  {
    id: 70,
    title: "Online market platform – Mahila E-Haat",
    category: "E-commerce",
    description:
      "An online platform for women entrepreneurs to showcase and sell their products.",
    benefits: [
      "Access to a wider market",
      "Promotes entrepreneurship among women",
    ],
    eligibility: "Women entrepreneurs",
    link: "https://mahilaehaat-rmk.gov.in/",
  },
  {
    id: 71,
    title:
      "Combating Adolescent Anaemia (Weekly Iron and Folic Acid Supplementation (WIFS) Programme)",
    category: "Healthcare",
    description:
      "A program to combat anaemia among adolescent girls through supplementation.",
    benefits: [
      "Improved health and nutrition",
      "Reduction in anaemia prevalence",
    ],
    eligibility: "Adolescent girls",
    link: "https://www.nhp.gov.in/",
  },
  {
    id: 72,
    title: "Forum for Women in Public Sector (WIPS Scheme)",
    category: "Employment",
    description:
      "A forum to promote the interests of women in the public sector.",
    benefits: [
      "Networking and support",
      "Promotes gender equality in the public sector",
    ],
    eligibility: "Women in the public sector",
    link: "https://dpe.gov.in/",
  },
  {
    id: 73,
    title:
      "Promoting horticulture among women farmers (Mission for Integrated Development of Horticulture (MIDH))",
    category: "Agriculture",
    description:
      "Encouraging women farmers to take up horticulture for sustainable income generation.",
    benefits: [
      "Training and capacity building",
      "Access to resources and technology",
    ],
    eligibility: "Women farmers",
    link: "https://agricoop.nic.in/",
  },
  {
    id: 74,
    title:
      "Promoting mechanisation among women farmers – Sub-Mission on Agricultural mechanization",
    category: "Agriculture",
    description:
      "Encouraging the use of modern agricultural machinery among women farmers.",
    benefits: [
      "Access to modern farming equipment",
      "Increased productivity and efficiency",
    ],
    eligibility: "Women farmers",
    link: "https://agricoop.nic.in/",
  },
  {
    id: 75,
    title:
      "Promoting sustainable agricultural practices among women farmers (National Mission for Sustainable Agriculture (NMSA))",
    category: "Agriculture",
    description:
      "Encouraging women farmers to adopt sustainable agricultural practices.",
    benefits: [
      "Training and capacity building",
      "Access to resources and technology",
    ],
    eligibility: "Women farmers",
    link: "https://agricoop.nic.in/",
  },
  {
    id: 76,
    title: "Mahila Kisan Sashatikaran Pariyojana (MKSP)",
    category: "Agriculture",
    description:
      "A project to empower women farmers through skill development and capacity building.",
    benefits: ["Skill development", "Increased productivity and income"],
    eligibility: "Women farmers",
    link: "https://agricoop.nic.in/",
  },
  {
    id: 77,
    title: "Promoting women farmers through National Food Security Mission",
    category: "Agriculture",
    description:
      "Encouraging women's participation in agriculture to enhance food security.",
    benefits: [
      "Training and capacity building",
      "Access to resources and technology",
    ],
    eligibility: "Women farmers",
    link: "https://agricoop.nic.in/",
  },
  {
    id: 78,
    title: "Women in National Cadet Corps",
    category: "Defence",
    description:
      "Encouraging women's participation in the National Cadet Corps.",
    benefits: [
      "Leadership and skill development",
      "Opportunities in defence services",
    ],
    eligibility: "Women students",
    link: "https://indiancc.nic.in/",
  },
  {
    id: 79,
    title: "Provisions for women employees of the Indian Railways",
    category: "Employment",
    description:
      "Special provisions and facilities for women employees in the Indian Railways.",
    benefits: ["Safe working environment", "Support for work-life balance"],
    eligibility: "Women employees of Indian Railways",
    link: "https://www.indianrailways.gov.in/",
  },
  {
    id: 80,
    title: "Resources for women farmers (M-kisan and National Farmer’s Portal)",
    category: "Agriculture",
    description:
      "Providing information and resources to women farmers through digital platforms.",
    benefits: [
      "Access to agricultural information",
      "Improved farming practices",
    ],
    eligibility: "Women farmers",
    link: "https://mkisan.gov.in/",
  },
  {
    id: 81,
    title: "National Young Leader Programme",
    category: "Youth Development",
    description:
      "A program to nurture young leaders and encourage their participation in nation-building.",
    benefits: ["Leadership training", "Opportunities for community service"],
    eligibility: "Young individuals",
    link: "https://www.india.gov.in/",
  },
  {
    id: 82,
    title: "National Women Bio-scientist Award",
    category: "Science and Technology",
    description:
      "Award to recognize and promote excellence in biosciences among women.",
    benefits: [
      "Recognition and financial reward",
      "Encourages women in biosciences",
    ],
    eligibility: "Women bioscientists",
    link: "https://dst.gov.in/",
  },
  {
    id: 83,
    title: "CSR contribution for women’s issues (Companies Act, 2013)",
    category: "Corporate Social Responsibility",
    description:
      "Encouraging companies to contribute to women's issues through CSR activities.",
    benefits: [
      "Increased funding for women's issues",
      "Promotes corporate responsibility",
    ],
    eligibility: "Companies",
    link: "https://www.mca.gov.in/",
  },
  {
    id: 84,
    title: "Micro-credit – Rashtriya Mahila Kosh (RMK)",
    category: "Financial Inclusion",
    description:
      "Providing micro-credit to women for their economic empowerment.",
    benefits: [
      "Access to credit for small businesses",
      "Promotes entrepreneurship among women",
    ],
    eligibility: "Women entrepreneurs",
    link: "https://rmk.nic.in/",
  },
  {
    id: 85,
    title: "Women in corporate boards (Companies Act, 2013)",
    category: "Corporate Governance",
    description: "Mandating the inclusion of women on corporate boards.",
    benefits: [
      "Increased representation of women in corporate leadership",
      "Promotes gender equality",
    ],
    eligibility: "Companies",
    link: "https://www.mca.gov.in/",
  },
  {
    id: 86,
    title: "Loan for ST women (Adivasi Mahila Sashaktikaran Yojana)",
    category: "Financial Inclusion",
    description: "Providing loans to ST women for their economic empowerment.",
    benefits: [
      "Access to credit for small businesses",
      "Promotes entrepreneurship among ST women",
    ],
    eligibility: "ST women",
    link: "https://tribal.nic.in/",
  },
  {
    id: 87,
    title:
      "Legal/financial assistance to Indian women deserted/divorced by their NRI spouses",
    category: "Legal",
    description:
      "Support and assistance for Indian women deserted or divorced by their NRI spouses.",
    benefits: ["Legal and financial support", "Protection of rights"],
    eligibility: "Indian women deserted/divorced by NRI spouses",
    link: "https://www.mha.gov.in/",
  },
  {
    id: 88,
    title:
      "Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA) Promoting Women SHGs through National Rural Livelihood Mission (NRLM))",
    category: "Employment",
    description:
      "Promoting women's self-help groups under MGNREGA and NRLM for economic empowerment.",
    benefits: ["Financial inclusion", "Skill development and entrepreneurship"],
    eligibility: "Women in rural areas",
    link: "https://nrega.nic.in/",
  },
  {
    id: 89,
    title: "Housing finance (Pradhan Mantri Awas Yojana)",
    category: "Housing",
    description:
      "Providing affordable housing finance under the Pradhan Mantri Awas Yojana.",
    benefits: [
      "Access to affordable housing",
      "Financial assistance for house construction",
    ],
    eligibility: "Eligible beneficiaries",
    link: "https://pmaymis.gov.in/",
  },
  {
    id: 90,
    title: "Hostels for ST girl students",
    category: "Education",
    description:
      "Providing hostel facilities for ST girl students to support their education.",
    benefits: ["Safe and supportive environment", "Access to education"],
    eligibility: "ST girl students",
    link: "https://tribal.nic.in/",
  },
  {
    id: 91,
    title: "Grant-in-aid for welfare of women labour",
    category: "Labour and Employment",
    description: "Financial assistance for the welfare of women labourers.",
    benefits: ["Support for welfare activities", "Improved working conditions"],
    eligibility: "Women labourers",
    link: "https://labour.gov.in/",
  },
  {
    id: 92,
    title: "Gender sensitization in schools & colleges (Gender Champions)",
    category: "Education",
    description:
      "Promoting gender sensitization among students through the Gender Champions initiative.",
    benefits: [
      "Increased awareness and sensitivity",
      "Promotes gender equality",
    ],
    eligibility: "Students",
    link: "https://www.education.gov.in/",
  },
  {
    id: 93,
    title: "Family Planning Programme",
    category: "Healthcare",
    description:
      "A program to promote family planning and reproductive health.",
    benefits: [
      "Access to family planning services",
      "Improved reproductive health",
    ],
    eligibility: "Eligible couples",
    link: "https://www.nhp.gov.in/",
  },
  {
    id: 94,
    title:
      "Biotechnology Career Advancement and Re-orientation Programme (BIOCARE)",
    category: "Science and Technology",
    description:
      "A program to support career advancement in biotechnology for women.",
    benefits: [
      "Career development opportunities",
      "Promotes women in biotechnology",
    ],
    eligibility: "Women in biotechnology",
    link: "https://dst.gov.in/",
  },
  {
    id: 95,
    title: "Biotechnology based programmes for women",
    category: "Science and Technology",
    description:
      "Promoting biotechnology-based programs for the benefit of women.",
    benefits: [
      "Access to biotechnology training and resources",
      "Promotes innovation and entrepreneurship",
    ],
    eligibility: "Women",
    link: "https://dst.gov.in/",
  },
  {
    id: 96,
    title:
      "Precautions to take in cases of Indian women married to PIOs and NRIs",
    category: "Legal",
    description:
      "Guidelines and precautions for Indian women married to PIOs and NRIs.",
    benefits: ["Legal advice and support", "Protection of rights"],
    eligibility: "Indian women married to PIOs and NRIs",
    link: "https://www.mha.gov.in/",
  },
  {
    id: 97,
    title: "33% reservation in police force",
    category: "Governance",
    description:
      "Reservation of one-third of positions for women in the police force.",
    benefits: [
      "Increased representation of women in policing",
      "Promotes gender equality",
    ],
    eligibility: "Women",
    link: "https://www.mha.gov.in/",
  },
  {
    id: 98,
    title: "Adolescence Education Programme (AEP)",
    category: "Education",
    description:
      "A program to provide education and awareness on adolescence-related issues.",
    benefits: [
      "Increased awareness and knowledge",
      "Promotes healthy development",
    ],
    eligibility: "Adolescents",
    link: "https://www.education.gov.in/",
  },
  {
    id: 99,
    title: "Rajiv Gandhi Panchayat Sashaktikaran Abhiyan (RGPSA) Scheme",
    category: "Governance",
    description:
      "A scheme to strengthen Panchayati Raj institutions and promote decentralization.",
    benefits: [
      "Strengthened local governance",
      "Increased participation in decision-making",
    ],
    eligibility: "Panchayati Raj institutions",
    link: "https://www.panchayat.gov.in/",
  },
];

// Categories summary
const CategoryBadge = ({ children, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
      active
        ? "bg-pink-300 text-white shadow-lg shadow-pink-200"
        : "bg-white text-gray-600 hover:bg-gray-100"
    }`}
  >
    {children}
  </button>
);


const Modal = ({ isOpen, onClose, scheme }) => {
  if (!isOpen || !scheme) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md px-4">
      {/* Clickable background overlay */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 md:px-8 animate-fadeIn scale-105">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-500 hover:text-gray-700 transition"
        >
          <X size={26} />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-pink-700">{scheme.title}</h2>
          <p className="text-gray-500 text-lg mt-1">{scheme.description}</p>
        </div>

        {/* Key Details in a Grid */}
        <div className="bg-gray-100 rounded-lg p-4 grid grid-cols-2 gap-4 text-gray-700">
          <div className="flex items-center gap-2">
            <Bookmark size={20} className="text-pink-600" />
            <p className="font-medium">Category:</p>
            <p className="text-gray-900">{scheme.category}</p>
          </div>
          <div className="flex items-center gap-2">
            <Users size={20} className="text-pink-600" />
            <p className="font-medium">Eligibility:</p>
            <p className="text-gray-900">{scheme.eligibility}</p>
          </div>
        </div>

        {/* Benefits List */}
        <div className="mt-5">
          <h3 className="text-lg font-semibold text-gray-800">Benefits</h3>
          <ul className="mt-2 space-y-2">
            {scheme.benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-2 text-gray-700">
                <CheckCircle size={18} className="text-green-600" />
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Button */}
        <div className="mt-6 text-center">
          <a
            href={scheme.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 text-white bg-pink-600 hover:bg-pink-700 transition-all py-2 px-4 rounded-lg shadow-lg text-md font-medium"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
};


const SchemeCard = ({ scheme, onClick }) => {
  const getIcon = () => {
    if (scheme.title.toLowerCase().includes("employment"))
      return <Briefcase className="w-6 h-6 text-purple-300" />;
    if (scheme.title.toLowerCase().includes("education"))
      return <Book className="w-6 h-6 text-green-300" />;
    if (scheme.title.toLowerCase().includes("health"))
      return <Heart className="w-6 h-6 text-red-300" />;
    return <Users className="w-6 h-6 text-pink-300" />;
  };

  return (
    <div
      onClick={onClick}
      className="group border rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer bg-white hover:bg-gray-50 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-pink-100 rounded-bl-full -mr-12 -mt-12 group-hover:bg-pink-200 transition-colors duration-300" />
      <div className="relative">
        <div className="flex justify-between items-start mb-4">
          {getIcon()}
        </div>
        <h3 className="text-xl font-semibold text-pink-800 group-hover:text-pink-600 transition-colors duration-300">
          {scheme.title}
        </h3>
        <p className="text-gray-600 mt-2 line-clamp-2 text-sm">
          {scheme.description}
        </p>
        <div className="mt-4 flex items-center text-sm text-pink-600 font-medium">
          <span>View Details</span>
          <ExternalLink className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
        </div>
      </div>
    </div>
  );
};

const SchemesList = () => {
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredSchemes, setFilteredSchemes] = useState(schemes);

  const categories = [
    "All",
    "Healthcare",
    "Education",
    "Employment",
    "Social Welfare",
    "Agriculture",
    "Defence",
    "Housing",
    "Science and Technology",
    "Governance",
    "Legal",
    "Financial Inclusion",
    "Skill Development",
    "Infrastructure",
    "Transport",
    "E-commerce",
    "Corporate Governance",
    "Child Welfare",
  ];

  useEffect(() => {
    const filtered = schemes.filter((scheme) => {
      // Match search term
      const matchesSearch =
        scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        scheme.description.toLowerCase().includes(searchTerm.toLowerCase());

      // Match category
      const matchesCategory =
        selectedCategory === "All" || scheme.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    setFilteredSchemes(filtered);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-pink-500 mb-6">
            Government Schemes for Women
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Explore various government initiatives designed to support and
            empower women across India through financial assistance, skill
            development, and social welfare programs.
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search schemes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all duration-300"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <CategoryBadge
                key={category}
                active={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </CategoryBadge>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSchemes.map((scheme) => (
            <SchemeCard
              key={scheme.id}
              scheme={scheme}
              onClick={() => setSelectedScheme(scheme)}
            />
          ))}
        </div>

        {filteredSchemes.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No schemes found matching your criteria
            </p>
          </div>
        )}

        <Modal
          scheme={selectedScheme}
          isOpen={!!selectedScheme}
          onClose={() => setSelectedScheme(null)}
        />
      </div>
    </div>
  );
};

export default SchemesList;