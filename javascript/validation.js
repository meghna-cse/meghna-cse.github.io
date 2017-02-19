//Form validation code
      function validate()
      {
         if( document.myForm.Name.value == "" )
         {
            alert( "Please provide your Name!" );
            document.myForm.Name.focus() ;
            return false;
         }
         
         else if( document.myForm.EMail.value == "" )
         {
            alert( "Please provide your Email!" );
            document.myForm.EMail.focus() ;
            return false;
         }
         
         else if( document.myForm.connect.value == "" )
         {
            alert( "Please provide us the feedback." );
            document.myForm.connect.focus() ;
            return false;
         }
         return( true );
      }