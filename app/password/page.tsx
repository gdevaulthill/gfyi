import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Enter Password',
  robots: {
    index: false,
    follow: false,
  },
};

async function verifyPassword(formData: FormData) {
  'use server';

  const submitted = formData.get('password')?.toString() ?? '';
  const redirectTo = formData.get('redirectTo')?.toString() || '/';
  const expected = process.env.SITE_PASSWORD;

  if (!expected) {
    throw new Error('SITE_PASSWORD is not configured');
  }

  if (submitted === expected) {
    const cookieStore = await cookies();
    cookieStore.set({
      name: 'site-auth',
      value: 'true',
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });

    redirect(redirectTo || '/');
  }

  redirect('/password?error=1');
}

export default function PasswordPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const showError = searchParams?.error === '1';
  const redirectToParam = typeof searchParams?.from === 'string' ? searchParams.from : '/';

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold">Protected</h1>
          <p className="text-sm text-neutral-300">
            Enter the password to view this site.
          </p>
          {showError && (
            <p className="text-sm text-red-400">Incorrect password. Try again.</p>
          )}
        </div>
        <form action={verifyPassword} className="space-y-4">
          <input type="hidden" name="redirectTo" value={redirectToParam} />
          <label className="block">
            <span className="mb-2 block text-sm uppercase tracking-wide text-neutral-300">
              Password
            </span>
            <input
              type="password"
              name="password"
              required
              className="w-full rounded border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm focus:border-white focus:outline-none focus:ring-0"
              autoComplete="current-password"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded bg-white py-2 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-neutral-200"
          >
            Enter
          </button>
        </form>
      </div>
    </div>
  );
}
