import { OrganizationSwitcher, auth } from "@clerk/nextjs";
import React from "react";

export default function Organization() {
  const { userId, orgId } = auth();
  return (
    <div className="flex flex-col p-6">
      <span>userId: {userId}</span>
      <span>orgId: {orgId}</span>
    </div>
  );
}
