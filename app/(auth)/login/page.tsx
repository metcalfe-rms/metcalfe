import LoginPageView from "../login";

type LoginPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function getLoginNotice(params: Record<string, string | string[] | undefined>) {
  if (typeof params.loggedOut === "string") {
    return "You have been logged out successfully.";
  }

  if (typeof params.deactivated === "string") {
    return "Your account has been deactivated. Contact support if you need access restored.";
  }

  return undefined;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const resolvedSearchParams = await searchParams;

  return <LoginPageView notice={getLoginNotice(resolvedSearchParams)} />;
}
