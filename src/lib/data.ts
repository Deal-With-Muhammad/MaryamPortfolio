import type { StaticImageData } from "next/image";

import art1 from "@/assets/art/img1.jpg";
import art2 from "@/assets/art/img2.jpg";
import art3 from "@/assets/art/img3.jpg";
import art4 from "@/assets/art/img4.jpg";
import art5 from "@/assets/art/img5.jpg";
import art6 from "@/assets/art/img6.jpg";
import art7 from "@/assets/art/img7.jpeg";
import art8 from "@/assets/art/img8.jpeg";
import art9 from "@/assets/art/img9.jpeg";
import art10 from "@/assets/art/img10.jpeg";
import art11 from "@/assets/art/img11.jpeg";
import art12 from "@/assets/art/img12.jpeg";
import art13 from "@/assets/art/img13.jpeg";
import art14 from "@/assets/art/img14.jpeg";
import art15 from "@/assets/art/img15.jpeg";
import art16 from "@/assets/art/img16.jpeg";
import art17 from "@/assets/art/img17.jpeg";
import art18 from "@/assets/art/img18.jpeg";
import art19 from "@/assets/art/img19.jpeg";
import art20 from "@/assets/art/img20.jpeg";
import art21 from "@/assets/art/img21.jpeg";
import art22 from "@/assets/art/img22.jpeg";

// Single source of truth for the website and the résumé (/resume).

export const profile = {
  name: "Maryam Basit",
  headline: "Teacher · Administrator · Artist",
  location: "Klang, Selangor, Malaysia",
  email: "maryamworkspace@gmail.com",
  phone: "+60 11-2715 1051",
  phoneHref: "tel:+601127151051",
  whatsapp: "https://wa.me/601127151051",
  linkedin: "https://www.linkedin.com/in/maryam-basit-bb5886386",
  linkedinLabel: "linkedin.com/in/maryam-basit-bb5886386",
  website: "https://mimi-maryam-portfolio.vercel.app",
  websiteLabel: "mimi-maryam-portfolio.vercel.app",
  resumePdf: "/Maryam-Basit-Resume.pdf",
  summary:
    "Teacher and school administrator with experience in primary, refugee and special-needs education. Also an artist and copywriter, currently studying Business Administration.",
};

export type Job = {
  role: string;
  org: string;
  location: string;
  start: string;
  end: string;
  points: string[];
};

// Most recent first, by end date.
export const experience: Job[] = [
  {
    role: "Teacher / Administrator",
    org: "Ember Path Special Needs Education",
    location: "Kuala Lumpur",
    start: "Sep 2026",
    end: "Sep 2026",
    points: [
      "Taught and supported students with special educational needs in small groups.",
      "Helped with daily admin, scheduling and communication with families.",
    ],
  },
  {
    role: "Science Teacher / Administrator",
    org: "Empower Learning System (ELS)",
    location: "Klang, Selangor",
    start: "Dec 2025",
    end: "Aug 2026",
    points: [
      "Taught science to primary students through simple, hands-on lessons.",
      "Supported the school office with attendance, records and parent updates.",
    ],
  },
  {
    role: "Teacher Assistant",
    org: "Fugee School",
    location: "Gombak, Selangor",
    start: "Sep 2024",
    end: "Jun 2025",
    points: [
      "Assisted Year 7–9 classes at an NGO school for refugee children.",
      "Supported lesson preparation, classroom management and student engagement.",
    ],
  },
  {
    role: "Quran Teacher",
    org: "ITQA",
    location: "Online",
    start: "Sep 2023",
    end: "Jun 2025",
    points: [
      "Taught Quran reading and pronunciation to students in Malaysia, Australia, Canada, England and New Zealand.",
    ],
  },
  {
    role: "Copywriter",
    org: "Radiant Glow",
    location: "Remote",
    start: "Sep 2024",
    end: "Oct 2024",
    points: ["Wrote launch emails for PureEssence, a new skincare line."],
  },
];

export const education = [
  {
    title: "Bachelor’s in Business Administration",
    school: "University of the People",
    dates: "Jan 2026 – Present",
  },
  {
    title: "GED",
    school: "Fugee School",
    dates: "Sep 2024 – Jun 2025",
  },
  {
    title: "Primary Education",
    school: "Empower Learning Center (ELS)",
    dates: "Sep 2017 – Jun 2020",
  },
];

export const skills = [
  {
    group: "Teaching & admin",
    items: [
      "Lesson planning",
      "Classroom management",
      "Special-needs support",
      "School administration",
      "Parent communication",
    ],
  },
  {
    group: "Tools",
    items: ["Google Workspace", "Microsoft Excel", "PowerPoint", "Video editing"],
  },
  {
    group: "Creative",
    items: ["Copywriting", "Painting", "Henna", "Crochet"],
  },
];

export const languages = [
  { name: "Urdu", level: "Native" },
  { name: "English", level: "Proficient" },
  { name: "Hindi", level: "Proficient" },
];

export const highlights = [
  { title: "JRS Painting Competition", detail: "Winner" },
  { title: "Google Workspace", detail: "Course, Fugee School" },
];

export const artCategories = ["All", "Paint & ink", "Henna", "Crochet"] as const;
export type ArtCategory = Exclude<(typeof artCategories)[number], "All">;

export type Artwork = {
  id: string;
  src: StaticImageData;
  category: ArtCategory;
  alt: string;
};

// Ordered so the first few rows mix all three crafts.
export const artworks: Artwork[] = [
  { id: "2", src: art2, category: "Paint & ink", alt: "Painted portrait of a girl with long black hair" },
  { id: "1", src: art1, category: "Crochet", alt: "Bouquet of crocheted red roses" },
  { id: "3", src: art3, category: "Henna", alt: "Floral henna on both hands" },
  { id: "9", src: art9, category: "Paint & ink", alt: "Watercolour street with lanterns and an umbrella" },
  { id: "10", src: art10, category: "Crochet", alt: "Bouquet of pink crocheted tulips" },
  { id: "16", src: art16, category: "Henna", alt: "Henna on the back of the hand and fingers" },
  { id: "7", src: art7, category: "Paint & ink", alt: "Painting of two ducks among lily pads" },
  { id: "17", src: art17, category: "Crochet", alt: "Crocheted layer-cake keychain with a cherry" },
  { id: "6", src: art6, category: "Paint & ink", alt: "Ink drawing of a girl with heart eyes and blue bows" },
  { id: "4", src: art4, category: "Crochet", alt: "Crocheted lily-pad coasters with pink flowers" },
  { id: "11", src: art11, category: "Henna", alt: "Henna design with a heart on the hand" },
  { id: "15", src: art15, category: "Paint & ink", alt: "Painting of a hooded cartoon character on purple" },
  { id: "19", src: art19, category: "Crochet", alt: "Crocheted cherry and flower keychains on a jewellery tree" },
  { id: "14", src: art14, category: "Henna", alt: "Detailed henna pattern across the hand" },
  { id: "22", src: art22, category: "Crochet", alt: "Round crocheted coaster bordered with pink tulips" },
  { id: "8", src: art8, category: "Paint & ink", alt: "Line drawing of a hooded figure" },
  { id: "5", src: art5, category: "Crochet", alt: "Pink and white crocheted bunny on a flower base" },
  { id: "12", src: art12, category: "Crochet", alt: "Crocheted white bell-flower keychain" },
  { id: "13", src: art13, category: "Crochet", alt: "Red and white crocheted scrunchie" },
  { id: "18", src: art18, category: "Crochet", alt: "Crocheted onigiri keychain" },
  { id: "20", src: art20, category: "Crochet", alt: "Blue and white crocheted keychain" },
  { id: "21", src: art21, category: "Crochet", alt: "Small grey crocheted keychain with a smiling face" },
];

export const heroArt = [art2, art1, art16];
