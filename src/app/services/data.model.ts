export interface Astrology {
    Heavenly: string;
    Branch: string;
    BirthTime: string;
    Month: string;
    Day: string;
    AstrologyChart?: (AstrologyChartEntity)[] | null;
    FiveElements: string;
    LifeMajorStar: string;
    BodyMajorStar: string;
    HuaLu: string;
    HuaChiuan: string;
    HuaKe: string;
    HuaJi: string;
    Videos?: (VideosEntity)[] | null;
}
export interface AstrologyChartEntity {
    palace: string;
    isBodyPalace: boolean;
    heavenly: string;
    branch: string;
    major?: (MajorEntity | null)[] | null;
    minor?: (MinorEntity | null)[] | null;
    righteous?: (RighteousEntity | null)[] | null;
    score: number;
    majorDescription: string;
    minorDescription: string;
    righteousDescription: string;
}
export interface MajorEntity {
    Star: string;
    Status: string;
}
export interface MinorEntity {
    Star: string;
    Status: string;
}
export interface RighteousEntity {
    Star: string;
    Status: string;
}
export interface VideosEntity {
    url: string;
    description: string;
}
