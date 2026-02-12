import bannerImg from "../assets/about/banner.jpeg";
import aboutPhoto from "../assets/about/photo.png";
import aboutVideo from "../assets/about/video.mov";

export default function About() {
  return (
    <div className="space-y-12">
      <h1 className="text-2xl font-bold">About Redeemed Streetwear</h1>
      {/* Banner */}
      <section className=" overflow-hidden bg-black/5 border border-black/10">
        <div className="relative w-full h-48 sm:h-60 md:h-72">
          <img
            src={bannerImg}
            alt="About banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </section>

      {/* Text blocks */}
      <section className="space-y-10 max-w-4xl">
        <div>
          <h2 className="text-xl font-bold mb-2">Our Story</h2>
          <p className="text-sm text-black/70 leading-relaxed">
            Redeemed Streetwear was born from a love for designer fashion and a
            deeper calling to represent faith boldly. What started as a creative
            passion became a mission: to bring purpose into streetwear. We
            believe clothing is more than fabric — it’s a statement. And our
            statement is faith.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Our Mission</h2>
          <p className="text-sm text-black/70 leading-relaxed">
            Our mission is simple: To spread the Word in a wearable way. Through
            thoughtful design and strong messages, we aim to create pieces that
            inspire conversations, uplift spirits, and represent Jesus in
            everyday life. Wear Your Faith Boldly.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">Why Redeemed?</h2>
          <p className="text-sm text-black/70 leading-relaxed">
            “Redeemed” represents transformation. No matter your past, your
            mistakes, or your struggles — redemption is possible. This brand
            stands for second chances, growth, and walking with purpose. Not
            just in church, but in the streets.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-2">More Than Streetwear</h2>
          <p className="text-sm text-black/70 leading-relaxed">
            Redeemed Streetwear is not just clothing. It’s a movement rooted in
            faith, creativity, and courage. Every piece is designed with
            intention — to remind you who you belong to and what you stand for.
            Faith isn’t meant to be hidden.
          </p>
        </div>
      </section>

      {/* Bottom 2 columns: photo + video */}
      <section className="grid grid-cols-2 gap-8">
        {/* Photo */}
        <div className=" overflow-hidden bg-black/5 border border-black/10">
          <div className="relative w-full aspect-[3/4]">
            <img
              src={aboutPhoto}
              alt="About photo"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Video */}
        <div className=" overflow-hidden bg-black/5 border border-black/10">
          <div className="relative w-full aspect-[3/4]">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src={aboutVideo}
              autoPlay
              muted
              loop
              playsInline
            />
          </div>
        </div>
      </section>
    </div>
  );
}
