

const Quote = () => {
  return (
    <div className="min-h-screen bg-[#F5F5F8] flex items-center justify-center p-6">
      <div className="max-w-[600px] mx-auto">
        <div className="space-y-4">
          <blockquote className="text-[32px] leading-[1.2] font-medium text-black">
            "The customer service I received was exceptional. The support team went above and beyond to address my concerns."
          </blockquote>
          
          <div className="space-y-1">
            <h3 className="text-[16px] font-medium text-black">Jules Winnfield</h3>
            <p className="text-[14px] text-gray-600">CEO, Acme Inc</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quote;
