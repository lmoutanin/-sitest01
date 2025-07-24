<?php

class CSVReader {

    public function __construct() {
    }

    public static function generateArrayFromCSVFile($file, $delimiter = ";") {
        if (file_exists($file)) return self::generateArrayFromCSVString(file_get_contents($file), $delimiter);
        return false;
    }

    public static function generateArrayFromCSVString($csv_string, $delimiter = ";") {
        $csv_array = explode("\n", $csv_string);
        $rows = array_map(function($value) use ($delimiter) {
            return str_getcsv($value, $delimiter);
        }, $csv_array);
        $header = array_shift($rows);
        $csv = array();
        foreach ($rows as $row) {
            if (count($row) === count($header))
                $csv[] = array_combine($header, $row);
        }
        return $csv;
    }
}
