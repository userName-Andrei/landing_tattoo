<?php
require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

$recipient = "andrei_zhigachev@bk.ru";			//Получатель
$sender = "dronk-1@mail.ru";		// Отправитель

$name = htmlspecialchars(trim($_POST['name']));
$tel = htmlspecialchars(trim($_POST['tel']));
$comment = htmlspecialchars(trim($_POST['comment']));
$email = htmlspecialchars(trim($_POST['email']));
echo "{$name}<br>{$tel}<br>{$comment}<br>{$email}";

$mail = new PHPMailer(true);
$mail->CharSet = 'utf-8';
$mail->setLanguage('ru', 'PHPMailer/language/phpmailer.lang-ru.php');

try {
	//Настройки SMTP
    $mail->isSMTP();                                            // Send using SMTP
    $mail->Host       = 'smtp.mail.ru';                    // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
    $mail->Username   = $sender;                     // SMTP username
    $mail->Password   = 'q1w2e3r4t5y6u7i8o9p0';                               // SMTP password
    $mail->SMTPSecure = 'ssl';         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 465;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Получатели
    $mail->setFrom($sender);
    $mail->addAddress($recipient);     // Кому

    // Content
    $mail->isHTML(true);                                  // Установка HTML в сообщениях
    $mail->Subject = 'Запись клиента!';
    $mail->Body    = "<b>Имя: </b> {$name}; <br><b>Телефон: </b> {$tel};<br><b>Email: </b> {$email};<br><b>Комментарий: </b><br>{$comment}";
    $mail->AltBody = "{$name}: {$tel}    Сообщение:|{$comment}|";

    $mail->send();
    echo 'Сообщение отправлено!';
} catch (Exception $e) {
    echo "Сообщение не может быть отправлено. Mailer Error: {$mail->ErrorInfo}";
}
