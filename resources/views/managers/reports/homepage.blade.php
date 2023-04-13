

<!DOCTYPE html>
<html dir="rtl" lang="ar">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="apple-mobile-web-app-title" content="erp سمارت - smartcashier">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="mobile-web-app-capable" content="yes">

    <meta name="csrf-token" content="{{ csrf_token() }}">

    <!--Google Fonts-->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@100;200;300;400;500;600;700;800;900&family=Inconsolata:wght@700;900&family=Raleway:wght@100;200;300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Archivo:wght@100;200;300;400;500;600;700;800;900&family=Cairo:wght@200;400;600;800&family=Inconsolata:wght@700;900&family=Raleway:wght@100;200;300;400;500;600;700;800;900&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <!-- font awosome file-->
    <link rel="stylesheet" href="{{ asset('newasset/css/all.min.css')}}">
    <!--/normalize file -->
    <link rel="stylesheet" href="{{ asset('newasset/css/normalize.css')}}">
    <!-- style sheet file-->
    <link rel="stylesheet" href="{{ asset('newasset/css/main.css')}}">
    <title> التقارير smart program</title>
</head>

<body >



    <div class="container">
        <div class="cection-header">
            التقارير
        </div>
        <section class="content">
            <!-- header for report section-->
            <!-- reports sections-->
            <div class="section section-one">
                <div class="thumb-link">
                    <a class="popoverData" href="{{route('ledgerpage')}}" data-tooltip="هو حساب يسجل جميع العمليات الخاصة بقائمة الدخل والمركز المالي ويساعد في استخراج رصيد كل حساب">
                        <img src="/newasset/assets/GL.png">
                        <p><b>دفتر الأستاذ</b></p>
                    </a>
                </div>
                <div class=" thumb-link">
                    <a class="popoverData" href="{{route('Journal_Reports')}}" rel="popover" data-tooltip=" هو سجل يسجل فيه جميع العمليات المالية حسب تسلسلها التاريخى، أولا بأول باتباع طريقة القيد المزدوج">
                        <img src="/newasset/assets/JR.png">
                        <p><b>دفتر القيود</b></p>
                    </a>
                </div>
                <div class=" thumb-link">
                    <a class="popoverData" href="#" data-tooltip=" هو عبارة عن تقرير وميزان مالي يوضح وضع الحساب ، فإما أن يكون دائنا بالإيداعات أو مدينا بالمسحوبات">
                        <img src="/newasset/assets/IS.png">
                        <p><b> كشف الحسابات</b></p>
                    </a>
                </div>
                <div class="thumb-link">
                    <a class="popoverData" href="{{route('Balance_Sheet')}}" rel="popover" data-tooltip="هو كشف تظهر فيه مجاميع الاطراف المدينة ومجاميع الاطراف الدائنة للحسابات الظاهرة في دفتر الاستاذ، ومن المفترض أن تتساوى هذه المجاميع">
                        <img src="/newasset/assets/TB.png">
                        <p><b>ميزان المراجعة</b></p>
                    </a>
                </div>

            </div>

            <div class="section section-two">
                <div class="thumb-link">
                    <a class="popoverData ghcustom" href="#" data-tooltip="هي قائمة تظهر ربحية الشركة خلال فترة زمنية معينة، وتتكون من إيرادات ومصروفات المنشأة">
                        <img src="/newasset/assets/IS.png">
                        <p><b>قائمة الدخل</b></p>
                    </a>
                </div>
                <div class="thumb-link">
                    <a class="popoverData ghcustom" href="{{route('report.sales_and_purchasesreport')}}" data-tooltip=" تقرير يبين كمية مبيعات و مشتريات المنتجات و مجموعها و متوسط سعر شراؤها و بيعها">
                        <img src="/newasset/assets/IR.png">
                        <p><b>ملخص المبيعات والمشتريات</b></p>
                    </a>
                </div>
                <div class="thumb-link">
                    <a class="popoverData" href="{{route('report.ar_by_customers')}}" data-tooltip=" تقرير يوضح المبالغ المستحقة لك حسب كل عميل">
                        <img src="/newasset/assets/ARC.png">
                        <p><b> حساب العملاء المدينون</b></p>
                    </a>
                </div>
                <div class="thumb-link">
                    <a class="popoverData" href="{{route('report.taxreport')}}" data-tooltip="يعرفك الإقرار الضريبي على الضرائب المدفوعة والمستلمة والمستحقة">
                        <img src="/newasset/assets/BS.png">
                        <p><b> نموذج الإقرار الضريبي</b></p>
                    </a>
                </div>

            </div>
            <div class="section section-three">
                <div class="thumb-link">
                    <a class="popoverData" href="{{route('Balance_Sheet')}}" rel="popover" data-tooltip="هي قائمة تلخص أصول، وخصوم، وحقوق الملكية للمنشأة في تاريخ معين ">
                        <img src="/newasset/assets/BS.png">
                        <p><b>الميزانية العمومية</b></p>
                    </a>
                </div>
                <div class="thumb-link">
                    <a class="popoverData" href="{{route('report.sales_invoices')}}" data-tooltip="هو حساب يسجل جميع العمليات الخاصة بقائمة الدخل والمركز المالي ويساعد في استخراج رصيد كل حساب">
                        <img src="/newasset/assets/AOB.png">
                        <p><b> تقرير فواتير المبيعات الضريبيه</b></p>
                    </a>
                </div>
                <div class=" thumb-link">
                    <a class="popoverData ghcustom" href="{{route('report.tax')}}" data-tooltip="هي قائمة تظهر ربحية الشركة خلال فترة زمنية معينة، وتتكون من إيرادات ومصروفات المنشأة">
                        <img src="/newasset/assets/AOB.png">
                        <p><b> تقرير فواتير المشتريات الضريبيه</b></p>
                    </a>
                </div>
                <div class="thumb-link">
                    <a class="popoverData" href="{{route('report.ap_by_vendors')}}" data-tooltip="تقرير يوضح المبالغ المستحقة للموردين حسب كل مورد.لتستطيع التحكم في مستوى المديونية">
                        <img src="/newasset/assets/APV.png">
                        <p><b> حساب الموردين الدائنين</b></p>
                    </a>
                </div>

            </div>
            <div class="section section-four">
                <div class="thumb-link">
                    <a class="popoverData" href="{{route('report.productcharts')}}" data-tooltip="تقرير يوضح مبيعات كل منتج حسب الفترة المحددة مع امكانية المقارنة بفترات سابقة">
                        <img src="/newasset/assets/PSTL.png">
                        <p><b> تقرير مبيعات المنتجات</b></p>
                    </a>
                </div>

                <div class="thumb-link">
                    <a class="popoverData ghcustom" href="{{route('report.purchase_order')}}" data-tooltip="تقرير يوضح مشتريات كل منتج حسب الفترة المحددة مع امكانية المقارنة بفترات سابقة">
                        <img src="/newasset/assets/PSTL.png">
                        <p><b> تقرير مشتريات المنتجات</b></p>
                    </a>
                </div>
                <div class="thumb-link">
                    <a class="popoverData" href="{{route('report.SummaryAccount')}}" data-tooltip=" هو عرض بياني ومجدول لرصيد الحساب خلال فترة زمنية معينة يحددها المستخدم">
                        <img src="/newasset/assets/AS.png">
                        <p><b>ملخص الحساب</b></p>
                    </a>
                </div>


            </div>
        </section>
    </div>




    <script src="{{ asset('js/reports.js') }}" ></script>




    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
    <script src="{{ asset('js/main.js') }}"></script>

</body>

</html>