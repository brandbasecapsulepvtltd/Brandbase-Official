// app/terms/page.jsx
import TermsAndConditions from "@/pages/TermsAndConditions";
import { api } from "@/lib/api";

export const metadata = {
  title: "Terms & Conditions | BrandBase Capsule - Legal Agreement",
  description: "Read our Terms & Conditions governing the use of BrandBase Capsule services.",
  keywords: ["terms and conditions", "legal agreement", "terms of service"],
};

export default async function TermsAndConditionsPage() {
  let policyData = null;
  try {
    const response = await api.getPolicy('terms-and-conditions');
    if (response.success) {
      policyData = response.data;
    }
  } catch (error) {
    console.error("Error fetching terms and conditions:", error);
  }

  return (
    <>
      {policyData && <TermsAndConditions data={policyData} />}
    </>
  );
}
