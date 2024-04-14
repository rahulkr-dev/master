type coursePriceType = {
  course: string;
  price: string;
};
const PriceCard = ({ course, price }: coursePriceType) => {
  return (
    <div>
      <div>{course}</div>
      <div>{price}</div>
    </div>
  );
};

const NodeJsCard = () => {
  return <PriceCard course="Nodejs" price="100000000" />;
};

const ReactJsCard = () => {
  return <PriceCard course="ReactJs" price="9093490343" />;
};

export const CoursePriceContainer = () => {
  return (
    <div>
      <NodeJsCard />
      <ReactJsCard />
    </div>
  );
};
