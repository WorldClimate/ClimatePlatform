import Map from "@/components/Map";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  return (
    <div>
      <header id="header">
        <div className="logo container">
          <div>
            <h1>
              <Link
                href={"/main/home"}
                id="logo"
                className="text-muted-foreground text-lg md:text-4xl hover:text-blue-800"
              >
                The World Climate
              </Link>
            </h1>
          </div>
        </div>
        <div>
          <Image
            src={"/images/logo-transparent.png"}
            alt="logo"
            width={1024}
            height={1024}
            className="w-28 h-28 md:w-52 md:h-52 mx-auto"
          />
        </div>
      </header>
      <Map />
    </div>
  );
}
