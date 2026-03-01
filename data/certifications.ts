export interface Certification {
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  image?: string;
}

export const certifications: Certification[] = [
  // Example:
  // {
  //   name: "AWS Solutions Architect – Associate",
  //   issuer: "Amazon Web Services",
  //   date: "2025",
  //   credentialUrl: "https://www.credly.com/badges/...",
  //   image: "/certifications/aws-saa.png",
  // },
];
