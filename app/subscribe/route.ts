import { NextRequest } from "next/server";

import configureMailchimp from "@/config/mailchimp";
import { MAILCHIMP_LIST_ID } from "@/config/process";
import mailchimp from "@mailchimp/mailchimp_marketing";

configureMailchimp();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.email) {
      throw new Error("Email is required");
    }

    const res = await mailchimp.lists.addListMember(MAILCHIMP_LIST_ID, {
      email_address: body.email,
      status: "subscribed",
    });

    const data = res as any;
    const clientResponse = {
      status: "success",
      message: `${data.email_address} has been successfully ${data.status}!`,
    };

    return new Response(JSON.stringify(clientResponse), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (error: any) {
    console.error(error);
    if (error.status === 400) {
      return new Response(error.response.text, {
        status: 400,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "An Error Occurred",
      }),
      {
        status: 500,
        headers: { "content-type": "application/json" },
      }
    );
  }
}
