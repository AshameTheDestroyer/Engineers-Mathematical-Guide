import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
    text: string;
    href?: string;
    icon?: React.ReactNode;
};

type BreadcrumbsProps = {
    items: BreadcrumbItem[];
    separator?: React.ReactNode;
    className?: string;
    activeItemClasses?: string;
    inactiveItemClasses?: string;
    separatorClasses?: string;
};

const Breadcrumbs = ({
    items,
    separator = <ChevronRight className="mx-2 h-4 w-4 text-gray-400" />,
    className = "",
    activeItemClasses = "text-gray-600 font-medium",
    inactiveItemClasses = "text-blue-600 hover:text-blue-800 transition-colors duration-200",
    separatorClasses = "",
}: BreadcrumbsProps) => {
    return (
        <nav
            style={{ boxShadow: "none" }}
            className={`flex items-center text-sm ${className} bg-inherit`}
            aria-label="Breadcrumb"
        >
            <ol className="flex items-center space-x-1 overflow-x-auto py-2">
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <li className="flex items-center">
                            {item.icon && (
                                <span className="mr-2 text-gray-500">
                                    {item.icon}
                                </span>
                            )}
                            {!item.href ? (
                                <span
                                    className={`${activeItemClasses} text-md flex items-center whitespace-nowrap`}
                                >
                                    {item.text}
                                </span>
                            ) : (
                                <Link
                                    to={item.href}
                                    className={`${inactiveItemClasses} text-md flex items-center whitespace-nowrap hover:underline`}
                                >
                                    {item.text}
                                </Link>
                            )}
                        </li>
                        {index < items.length - 1 && (
                            <li className={separatorClasses}>{separator}</li>
                        )}
                    </React.Fragment>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
