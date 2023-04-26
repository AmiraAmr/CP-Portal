<?php

namespace App;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class monthly_summary_report extends Model
{
    use HasFactory;

    protected $fillable = [
       'total_bid_value',
        'date',
        'percentage_overall',
        'attendance_percentage',
    'number_attendees',
        'cash_in',
        'cash_in_percentage',
        'performance_point',
        'performance_percentage',

'cash_out',
'cash_out_percentage',
'commitment_point',
'commitment_percentage',

'marketing_project',
'percentage_marketing_project',

'tender_project',
'percentage_tender',
'saving_percentage',

'construction',
'daily_report_percentage',
'daily_report_number',
'marketing',
'tender',
'daily_financial_report',
'daily_financial_report_percentage',
'marketing_deal',
'percentage_deal_marketing',

    ];

}
