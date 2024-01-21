<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */
  $receiving_email_address = 'info@kpsychologovi.cz';

  if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
    include( $php_email_form );
  } else {
    die( 'Unable to load the "PHP Email Form" Library!');
  }

  $Kontakt = new PHP_Email_Form;
  $Kontakt->ajax = true;

  $Kontakt->to = $receiving_email_address;
  $Kontakt->from_name = $_POST['name'];
  $Kontakt->from_email = $_POST['email'];
  $Kontakt->subject = $_POST['subject'];

  $Kontakt->add_message( $_POST['name'], 'From');
  $Kontakt->add_message( $_POST['email'], 'Email');
  $Kontakt->add_message( $_POST['message'], 'Message', 10);

  echo $Kontakt->send();
?>
