<?php 
namespace App\facede_pattern;
abstract class Filter {


    public function MainFilter($request,$model){


        if ($request &&  $request->ref && $request->ref !== '') {
       $model =     $model->where('ref', 'LIKE', '%' . $request->ref . '%');
        }



        if ( $request && $request->project_id && $request->project_id !== '') {

            $model =     $model->where('project_id', $request->project_id);
        }



        if ( $request && $request->user_id && $request->user_id !== '') {

            $model =     $model->where('user_id', $request->user_id);
        }

  
        if ( $request && $request->from  && $request->from == '' ) {

            $model =     $model->wheredate('date', '>=', $request->from);
        }


        if ( $request && $request->to  && $request->to == '') {

            $model =     $model->wheredate('date', '<=', $request->to);
        }
  

        return       $model ;


    }


}