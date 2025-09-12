import React from "react";

const ContactBlock: React.FC = () => {
  return (
    <div className="text-center mt-12">
      <div className="bg-green-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4 text-green-700">
          Нужно утепление?
        </h2>
        <p className="text-gray-700 mb-6">
          Свяжитесь с нами для бесплатной консультации и расчета стоимости работ
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+79174283707"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            📞 +7 (917) 428-37-07
          </a>
          <a
            href="tel:+79625267025"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            📞 +7 (962) 526-70-25
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactBlock;
