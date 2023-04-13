@component('mail::message')
# Introduction


{{$content}}
@component('mail::button', ['url' => '/'])
Button Text
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
