@if (session('missing_fields'))
    <div x-data="{ open: true }" x-show="open"
        class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 class="text-lg font-bold text-gray-800 mb-4">Missing Permissions</h2>

            <p class="text-gray-600 mb-3">Người dùng từ chối cung cấp những thông tin sau:</p>

            <ul class="list-disc list-inside text-red-500 mb-4">
                @foreach(session('missing_fields') as $field)
                    <li>{{ $field }}</li>
                @endforeach
            </ul>

            <button @click="open = false; window.location.reload();"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold">
                Close
            </button>
        </div>
    </div>
@endif

<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('Dashboard') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 text-gray-900">
                    {{ __("You're logged in!") }}
                </div>
            </div>
        </div>
    </div>
</x-app-layout>