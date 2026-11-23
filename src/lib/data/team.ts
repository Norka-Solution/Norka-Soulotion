/**
 * Norka's leadership, shown on About and in the founder message.
 * `photo`: put the file in public/images/team/ and set the path here;
 * until then a branded monogram is shown.
 */
export interface TeamMember {
  key: string;
  name: { en: string; ar: string };
  role: { en: string; ar: string };
  photo?: string;
}

export const team: TeamMember[] = [
  {
    key: "ahmed-kamel",
    name: { en: "Eng. Ahmed Kamel", ar: "م. أحمد كامل" },
    role: { en: "CEO & Founder", ar: "المؤسس والرئيس التنفيذي" },
    photo: undefined, // e.g. "/images/team/ahmed-kamel.jpg"
  },
  {
    key: "nourhan",
    name: { en: "Eng. Nourhan", ar: "م. نورهان" },
    role: { en: "Managing Director", ar: "المدير التنفيذي" },
  },
  {
    key: "mahmoud-kamel",
    name: { en: "Eng. Mahmoud Kamel", ar: "م. محمود كامل" },
    role: { en: "Administrative Team", ar: "الفريق الإداري" },
  },
];

export const founder = team[0];
