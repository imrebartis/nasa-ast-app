// tslint:disable
export type Asteroid = {
  name: string;
  id: string;
  absolute_magnitude_h: string;
  close_approach_data: CloseApproachData[];
};

type CloseApproachData = {
  miss_distance: MissDistance;
}

type MissDistance = {
  kilometers: string;
}
