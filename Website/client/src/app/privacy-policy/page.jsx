// app/privacy-policy/page.jsx
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import { api } from "@/lib/api";

export const metadata = {
  title: "Privacy Policy | BrandBase Capsule - Data Protection & Security",
  description: "Read our comprehensive Privacy Policy. Learn how BrandBase Capsule protects your data.",
  keywords: ["privacy policy", "data protection", "GDPR compliance"],
};

export default async function PrivacyPolicyPage() {
  let policyData = null;
  try {
    const response = await api.getPolicy('privacy-policy');
    if (response.success) {
      policyData = response.data;
    }
  } catch (error) {
    console.error("Error fetching privacy policy:", error);
  }

  return (
    <>
      {policyData && <PrivacyPolicy data={policyData} />}
    </>
  );
}
