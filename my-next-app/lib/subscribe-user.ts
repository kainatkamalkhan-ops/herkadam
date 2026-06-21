import { sendSubscriptionWelcomeEmail } from "@/lib/email/send-subscription-welcome"
import {
  subscribeEmail,
  type SubscriptionSource,
  type SubscribeResult,
} from "@/lib/newsletter-subscribers"

export type UserSubscribeResult = SubscribeResult & {
  welcomeEmailSent: boolean
}

export async function subscribeUser(
  email: string,
  source: SubscriptionSource,
): Promise<UserSubscribeResult> {
  const result = await subscribeEmail(email, source)
  if (!result.ok) {
    return { ...result, welcomeEmailSent: false }
  }

  let welcomeEmailSent = false
  if (result.shouldSendWelcome) {
    const emailResult = await sendSubscriptionWelcomeEmail({ email, source })
    welcomeEmailSent = emailResult.ok
  }

  return { ...result, welcomeEmailSent }
}
