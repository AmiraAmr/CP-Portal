@component('mail::message')

{{$content}}
@if(!empty($contentmanager))
<p >manager comment </p>

<br>

<p>{{$contentmanager}}</p>
@endif
{{-- <a href="{{route('start')}}">
click here
</a> --}}

Thanks,<br>
ortal-cp
@endcomponent
