<?php

$reponse['success'] = false;

/* Si le formulaire est envoyé alors on fait les traitements */
if (isset($_POST['sendmail']))
{
	$reponse['success'] = false;
	
    /* Récupération des valeurs des champs du formulaire */
    if (get_magic_quotes_gpc())
    {
      $name	     	= stripslashes(trim($_POST['name']));
      $sender	    = stripslashes(trim($_POST['email']));
      $subject		= stripslashes(trim($_POST['subject']));
      $message		= stripslashes(trim($_POST['message']));
    }
    else
    {
      $name		    = trim($_POST['name']);
      $sender	    = trim($_POST['email']);
      $subject		= trim($_POST['subject']);
      $message		= trim($_POST['message']);
    }
 
    /* Expression régulière permettant de vérifier qu'aucun 
    * en-tête n'est inséré dans nos champs */
    $regex_head = '/[\n\r]/';
 
    /* Si le formulaire n'est pas posté de notre site on renvoie 
    * vers la page d'accueil */
    if($_SERVER['HTTP_REFERER'] != 'http://www.maximebobin.com/'
    && $_SERVER['HTTP_REFERER'] != 'http://maximebobin.com/')
    {
		$reponse['success'] = false;
    }
    /* On vérifie qu'il n'y a aucun header dans les champs */
    elseif (preg_match($regex_head, $sender) 
            || preg_match($regex_head, $name) 
            || preg_match($regex_head, $subject))
    {
        $reponse['success'] = false;
    }
    /* Si aucun problème et aucun cookie créé, on construit le message et on envoie l'e-mail */
    elseif (!isset($_COOKIE['sent']))
    {
        /* Destinataire (votre adresse e-mail) */
        //$to = 'contact@maximebobin.com';
        $to = 'bobin.pro@gmail.com';
 
        /* Construction du message */
        $msg  = 'Ce mail a été envoyé depuis maximebobin.com par '.$name.' '.$sender.".\r\n\r\n";
        $msg .= $message."\r\n";
 
        /* En-têtes de l'e-mail */
        $headers = 'From: '.$name.' <'.$sender.'>'."\r\n" . 'CC: '. $sender;
 
        /* Envoi de l'e-mail */
        if (mail($to, $subject, $msg, $headers))
        {
            /* On créé un cookie de courte durée (ici 120 secondes) pour éviter de 
            * renvoyer un mail en rafraichissant la page */
            setcookie("sent", "1", time() + 60);
 
            /* On détruit la variable $_POST */
            unset($_POST);
            
            $reponse['success'] = true;
        }
 
    }
    /* Cas où le cookie est créé et que la page est rafraichie, on détruit la variable $_POST */
    else
    {
    	$reponse['success'] = false;
        unset($_POST);
    }
}

// On a notre objet $reponse (un array en fait)
// reste juste à l'encoder en JSON et l'envoyer
header('Content-Type: application/json');
echo json_encode($reponse);
?>