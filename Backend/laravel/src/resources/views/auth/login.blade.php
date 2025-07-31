<x-guest-layout>
    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required
                autofocus autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="__('Password')" />

            <x-text-input id="password" class="block mt-1 w-full" type="password" name="password" required
                autocomplete="current-password" />

            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Remember Me -->
        <div class="block mt-4">
            <label for="remember_me" class="inline-flex items-center">
                <input id="remember_me" type="checkbox"
                    class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500" name="remember">
                <span class="ms-2 text-sm text-gray-600">{{ __('Remember me') }}</span>
            </label>
        </div>

        <div class="flex items-center justify-end mt-4">
            @if (Route::has('password.request'))
                <a class="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    href="{{ route('password.request') }}">
                    {{ __('Forgot your password?') }}
                </a>
            @endif

            <x-primary-button class="ms-3">
                {{ __('Log in') }}
            </x-primary-button>


        </div>
    </form>
    <div class="mt-4 flex justify-center">
        <a href="{{ route('google.login') }}"
            class="inline-flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="h-5 w-5 mr-2">
                <path fill="#EA4335"
                    d="M24 9.5c3.15 0 5.9 1.09 8.11 3.23l6.04-6.04C34.6 3.36 29.68 1 24 1 14.9 1 7.14 6.48 3.67 14.08l7.09 5.5C12.5 13.24 17.77 9.5 24 9.5z" />
                <path fill="#34A853"
                    d="M46.1 24.5c0-1.41-.13-2.77-.38-4.08H24v8.14h12.6c-.54 2.88-2.17 5.32-4.64 6.95l7.09 5.5C43.45 36.74 46.1 31 46.1 24.5z" />
                <path fill="#FBBC04"
                    d="M10.76 28.92a13.93 13.93 0 0 1 0-9.84l-7.09-5.5A23.94 23.94 0 0 0 0 24.5c0 3.97.95 7.72 2.67 11.04l8.09-6.62z" />
                <path fill="#4285F4"
                    d="M24 48c6.48 0 11.91-2.13 15.88-5.78l-7.09-5.5C30.6 38.55 27.48 39.5 24 39.5c-6.23 0-11.5-3.74-13.97-9.08l-8.09 6.62C7.14 41.52 14.9 48 24 48z" />
            </svg>
            Đăng nhập với Google
        </a>
    </div>

</x-guest-layout>