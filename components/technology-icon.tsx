import Image from 'next/image';

interface TechnologyIconProps {
  techName: string;
  size?: number; // Optional size for the icon
}

const technologyMap: { [key: string]: string } = {
  "React Native": "/icons/technologies/react-native.svg",
  "Node.js": "/icons/technologies/nodejs.png",
  "MongoDB": "/icons/technologies/mongodb.jpg",
  "Machine Learning": "/icons/technologies/machine-learning.svg",
  "Python": "/icons/technologies/python.png",
  "Scikit-learn": "/icons/technologies/scikit-learn.svg",
  "Pandas": "/icons/technologies/pandas.svg",
  "Matplotlib": "/icons/technologies/matplotlib.svg",
  "NLTK": "/icons/technologies/nltk.svg",
  "spaCy": "/icons/technologies/spacy.svg",
  "TensorFlow": "/icons/technologies/tensorflow.svg",
  "BeautifulSoup": "/icons/technologies/beautifulsoup.svg",
  "Selenium": "/icons/technologies/selenium.svg",
  "Data Analysis": "/icons/technologies/data-analysis.svg",
  "React": "/icons/technologies/react.png",
  "Next.js": "/icons/technologies/nextjs.png",
  "TypeScript": "/icons/technologies/typescript.jpg",
  "Tailwind CSS": "/icons/technologies/tailwind-css.png",
  "Vue.js": "/icons/technologies/vuejs.png",
  "Express": "/icons/technologies/express.svg",
  "FastAPI": "/icons/technologies/fastapi.png",
  "GraphQL": "/icons/technologies/graphql.png",
  "PostgreSQL": "/icons/technologies/postgresql.png",
  "Redis": "/icons/technologies/redis.svg",
  "Prisma": "/icons/technologies/prisma.svg",
  "Supabase": "/icons/technologies/supabase.svg",
  "Git": "/icons/technologies/git.png",
  "Docker": "/icons/technologies/docker.png",
  "AWS": "/icons/technologies/aws.jpg",
  "Vercel": "/icons/technologies/vercel.jpg",
  "Figma": "/icons/technologies/figma.png",
  "Django": "/icons/technologies/django.svg",
  "API REST": "/icons/technologies/api-rest.svg",
  "AWS IoT Core": "/icons/technologies/aws-iot-core.svg",
  "AWS Timestream": "/icons/technologies/aws-timestream.svg",
  "AWS DynamoDB": "/icons/technologies/aws-dynamodb.svg",
  "AWS S3": "/icons/technologies/aws-s3.svg",
  "AWS Elastic Beanstalk": "/icons/technologies/aws-elastic-beanstalk.svg",
  "Capacitor": "/icons/technologies/capacitor.svg",
  "Ionic": "/icons/technologies/ionic.svg",
  "IoT": "/icons/technologies/iot.svg",
  "ESP32": "/icons/technologies/esp32.svg",
  "ESP8266": "/icons/technologies/esp8266.svg",
  "MQTT": "/icons/technologies/mqtt.svg",
  "3D Printing": "/icons/technologies/3d-printing.svg",
  "Grafana": "/icons/technologies/grafana.svg",
};

export function TechnologyIcon({ techName, size = 24 }: TechnologyIconProps) {
  const iconSrc = technologyMap[techName];

  if (!iconSrc) {
    // Fallback to text if no icon is found
    return <span className="text-sm font-medium">{techName}</span>;
  }

  return (
    <Image
      src={iconSrc}
      alt={techName}
      width={size}
      height={size}
      className="inline-block"
    />
  );
}
