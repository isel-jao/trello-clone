import { OrganizationProfile } from "@clerk/nextjs";
export default function OrganizationSettingsPage() {
  return (
    <div className="  h-full  w-full p-8">
      <OrganizationProfile
        appearance={{
          elements: {
            rootBox: {
              boxShadow: "none",
              display: "flex",
              width: "100%",
              maxWidth: "100%",
            },
            card: {
              boxShadow: "none",
              backgroundColor: "transparent",
              border: "1px solid #7f7f7f7f",
            },
          },
        }}
      />
    </div>
  );
}
