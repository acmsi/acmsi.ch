interface AyahProps {
  arabicText: string
  translationText: string
  reference: string
  verseNumber?: string
  className?: string
}

export default function Ayah({
  arabicText,
  translationText,
  reference,
  verseNumber,
  className = '',
}: AyahProps) {
  return (
    <div className={`text-center space-y-6 ${className}`}>
      {/* Texte arabe style Quran.com */}
      <div className="relative max-w-5xl mx-auto">
        <p
          className="text-3xl lg:text-4xl quranic-text leading-loose"
          dir="rtl"
          lang="ar"
        >
          {arabicText}
          {verseNumber && (
            <span className="inline-flex items-center justify-center align-middle mx-3">
              <span className="w-10 h-10 lg:w-12 lg:h-12 inline-flex items-center justify-center relative text-2xl lg:text-3xl ayah-number">
                ۝
                <span className="absolute text-sm lg:text-base font-semibold">
                  {verseNumber}
                </span>
              </span>
            </span>
          )}
        </p>
      </div>

      {/* Traduction française */}
      <div className="text-lg lg:text-xl max-w-4xl mx-auto leading-relaxed">
        <p className="italic">« {translationText} »</p>
      </div>

      {/* Référence */}
      <div className="text-sm font-medium opacity-75">
        <p>— {reference}</p>
      </div>
    </div>
  )
}
