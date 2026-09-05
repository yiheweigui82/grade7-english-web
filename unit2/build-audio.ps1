$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Speech
$unitSynth = New-Object System.Speech.Synthesis.SpeechSynthesizer
$unitSynth.SelectVoice('Microsoft Zira Desktop')
$unitSynth.Rate = -2
$unitAudioPath = Join-Path $PSScriptRoot 'assets/audio'
New-Item -ItemType Directory -Force -Path $unitAudioPath | Out-Null
$unitWords = Get-Content -Raw -Encoding UTF8 (Join-Path $PSScriptRoot 'audio-words.json') | ConvertFrom-Json
$unitFormat = New-Object System.Speech.AudioFormat.SpeechAudioFormatInfo(22050, [System.Speech.AudioFormat.AudioBitsPerSample]::Sixteen, [System.Speech.AudioFormat.AudioChannel]::Mono)
foreach ($unitWord in $unitWords) {
    $unitFile = Join-Path $unitAudioPath ($unitWord.Replace("'", '_') + '.wav')
    if (-not (Test-Path -LiteralPath $unitFile)) {
        $unitSynth.SetOutputToWaveFile($unitFile, $unitFormat)
        $unitSynth.Speak($unitWord)
        $unitSynth.SetOutputToNull()
    }
}
$unitPhrases = Get-Content -Raw -Encoding UTF8 (Join-Path $PSScriptRoot 'audio-phrases.json') | ConvertFrom-Json
foreach ($unitPhrase in $unitPhrases) {
    $unitFile = Join-Path $unitAudioPath $unitPhrase.file
    if (-not (Test-Path -LiteralPath $unitFile)) {
        $unitSynth.SetOutputToWaveFile($unitFile, $unitFormat)
        $unitSynth.Speak($unitPhrase.text)
        $unitSynth.SetOutputToNull()
    }
}
$unitSynth.Dispose()
Write-Output "Generated $($unitWords.Count) local English word recordings."
Write-Output "Generated $($unitPhrases.Count) local passage recordings."
