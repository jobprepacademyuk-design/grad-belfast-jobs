const NEWSLETTER_ENDPOINT = import.meta.env.VITE_NEWSLETTER_SUBSCRIBE_URL;

const LOCAL_STORAGE_KEY = "gradbelfast.weeklySubscribers";

export interface SubscribeResult {
  /** Whether the subscription request was successfully processed. */
  success: boolean;
  /** Optional message returned by the API or local fallback. */
  message?: string;
  /** Indicates the email was stored locally because no endpoint is configured. */
  storedLocally?: boolean;
}

/**
 * Attempts to subscribe the provided email address to the weekly newsletter.
 *
 * When the `VITE_NEWSLETTER_SUBSCRIBE_URL` environment variable is set, this
 * function will POST the email to the configured endpoint. Otherwise, the
 * email is stored in `localStorage` so the behaviour can still be demoed in
 * development environments.
 */
export const subscribeToNewsletter = async (email: string): Promise<SubscribeResult> => {
  if (!email) {
    throw new Error("Email is required");
  }

  if (!NEWSLETTER_ENDPOINT) {
    if (typeof window === "undefined") {
      throw new Error("Newsletter endpoint is not configured.");
    }

    const stored = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    const subscribers: string[] = stored ? JSON.parse(stored) : [];

    if (subscribers.includes(email)) {
      throw new Error("This email is already subscribed.");
    }

    subscribers.push(email);
    window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(subscribers));

    return {
      success: true,
      storedLocally: true,
      message: "Newsletter endpoint not configured. Stored locally for demo purposes.",
    };
  }

  const response = await fetch(NEWSLETTER_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    let message = "Failed to subscribe to the newsletter.";

    try {
      const data = await response.json();
      message = data?.message ?? message;
    } catch (error) {
      console.error("Failed to parse newsletter error response", error);
    }

    throw new Error(message);
  }

  let message: string | undefined;

  try {
    const data = await response.json();
    message = data?.message;
  } catch (error) {
    // Some endpoints might not return JSON or a body at all. That's OK.
    console.warn("Newsletter endpoint returned a non-JSON response", error);
  }

  return {
    success: true,
    message,
  };
};

