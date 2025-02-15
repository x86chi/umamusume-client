import gql from "graphql-tag";
import { useGetSupportCardOnIdQuery } from "../../../generated/graphql";
import { CORE_SUPPORT_CARD_FIELD } from "../../common/fragments";
import SelectedCard from "./SelectedCard";

gql`
  ${CORE_SUPPORT_CARD_FIELD}
  query getSupportCardOnId($uuid: Int!) {
    supportCardId(uuid: $uuid) {
        ...CoreSupportCardField
        cardType
    }
  }
`;

type Props = {
  uuid: number
  onDeleteItem: (uuid: number) => void
}

const SelectedCardContainer: React.FC<Props> = (props: Props) => {
  const { loading, error, data } = useGetSupportCardOnIdQuery({
    variables: {
       uuid: props.uuid
    } 
  });
  if (loading) return (<p>loading...</p>)
  if (error) return (<p>error</p>)
  if (data == null || data.supportCardId == null) return (<p>data not exist</p>)

  return <SelectedCard
    uuid={Number(data.supportCardId.uuid!)}
    cardName={data.supportCardId.cardName!}
    cardType={data.supportCardId.cardType!}
    secondName={data.supportCardId.secondName!}
    cardImage={data.supportCardId.cardImage!}
    onDeleteItem={props.onDeleteItem}
   />
};

export default SelectedCardContainer;
