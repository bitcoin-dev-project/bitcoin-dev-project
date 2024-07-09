import mailchimp from "@mailchimp/mailchimp_marketing";

import { MAILCHIMP_API_KEY } from "./process";

const configureMailchimp = () => {
  mailchimp.setConfig({
    apiKey: MAILCHIMP_API_KEY,
    server: MAILCHIMP_API_KEY?.split("-")[1],
  });
};

export default configureMailchimp;
