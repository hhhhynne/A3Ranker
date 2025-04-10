
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";


interface StatCardProps {
    title: string;
    description?: string;
    stat: string;
}  ;


const StatCard = ({title, stat, description}: StatCardProps) => {

  return (
    <Card className="max-w-full w-52 h-48 border-primary flex flex-col justify-between">
      <CardHeader>
        <CardTitle className="flex justify-center">{title}</CardTitle>
        <CardDescription className="flex justify-center">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center items-center">
        <h1 className="text-4xl font-bold">{stat}</h1>
      </CardContent>
      <CardFooter className="flex justify-between">
      </CardFooter>
    </Card>
  )
}

export default StatCard;