export interface Astrology {
    Heavenly: string;
    Branch: string;
    BirthDay: string;
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
    major?: (StarEntity | null)[] | null;
    minor?: (StarEntity | null)[] | null;
    secondary?: (StarEntity | null)[] | null;
    righteous?: (StarEntity | null)[] | null;
    score: number;
    majorDescription: string;
    minorDescription: string;
    secondaryDescription: string;
    righteousDescription: string;
}

export interface StarEntity {
    Star: string;
    Status: string;
}
export interface VideosEntity {
    url: string;
    description: string;
}

export interface LunarDate {
    Month: number;
    IsLeap: boolean;
    LastDay: number;
}
