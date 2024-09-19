<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class AspectRatio implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string = null): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {

        $image = getimagesize($value);
        $width = $image[0];
        $height = $image[1];

        $aspectRatio = $width / $height;

        if(floor($aspectRatio * 100)/100 != 3/4){
            $fail("Aspek rasio pasfoto harus 3x4!");
        }
    }
}
